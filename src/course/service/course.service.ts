import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateCourseDTO, UpdateCourseDTO } from '../course.dto';
import { CourseEntity } from '../course.entity';
import { CourseValidationService } from './course-validation.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @Inject() private readonly validationService: CourseValidationService,
  ) {}

  async findAll() {
    // SELECT *
    // FROM course
    return await this.courseRepository.find({
      // LEFT JOIN subject ON course.subjectId = subject.id
      // LEFT JOIN student ON course.studentId = student.id
      // LEFT JOIN mentor ON course.mentorId = mentor.id
      relations: ['subject', 'student', 'mentor'],
      // ORDER BY datetime DESC;
      order: { datetime: 'DESC' },
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['subject', 'student', 'mentor'],
    });

    if (!course) {
      throw new NotFoundException(`The course with ID ${id} not found`);
    }

    return course;
  }

  async deleteOne(id: number) {
    const result = await this.courseRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`The course with ID ${id} not found`);
    }
  }

  async updateOne(id: number, dto: UpdateCourseDTO) {
    const { subject, student, mentor } =
      await this.validationService.resolveCourseRelations(dto);

    const entity = await this.courseRepository.preload({
      id,
      student,
      subject,
      mentor,
    });

    if (!entity) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    await this.courseRepository.save(entity);
    return await this.findOne(id);
  }

  async create(dto: CreateCourseDTO): Promise<CourseEntity> {
    const { subject, student, mentor } =
      await this.validationService.resolveCourseRelations(dto);

    const course = this.courseRepository.create({
      ...dto,
      student,
      subject,
      mentor,
    });

    try {
      await this.courseRepository.save(course);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        console.error('Erreur SQL :', error.message);
        throw new BadRequestException(
          'Invalid input data or database constrainte violated',
        );
      }
      throw error;
    }
    return await this.findOne(course.id);
  }
}
