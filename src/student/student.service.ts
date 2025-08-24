import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateStudentDTO, UpdateStudentDTO } from './student.dto';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    readonly studentRepository: Repository<StudentEntity>,
  ) {}

  /**
   * Returns both activate or deleted student list
   */
  async findAll() {
    return await this.studentRepository.find({ relations: ['courses'] });
  }

  /**
   * Returns both activate or deleted student
   */
  async findOne(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`The course with ID ${id} not found`);
    }

    return student;
  }

  async findAllActivate() {
    return await this.studentRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['courses'],
    });
  }

  async findOneActivate(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`The course with ID ${id} not found`);
    }

    return student;
  }

  /**
   * Procedes to a safe delete
   * The student entity is still available in database, only the colomn deletedAt is changing
   * @param id
   */
  async deleteOne(id: number) {
    const result = await this.studentRepository.update(id, {
      deletedAt: new Date(),
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `The course with ID ${id} not found or could not be deleted`,
      );
    }
  }

  async updateOne(id: number, dto: UpdateStudentDTO) {
    const entity = await this.studentRepository.preload({
      id,
      ...dto,
    });

    if (!entity) {
      throw new NotFoundException(`student with ID ${id} not found`);
    }

    await this.studentRepository.save(entity);

    return await this.findOne(id);
  }

  async create(dto: CreateStudentDTO) {
    const isExisting = await this.studentRepository.existsBy({
      email: dto.email,
    });

    if (isExisting) {
      throw new BadRequestException(
        `Student with email: ${dto.email} already exists`,
      );
    }

    const createdStudent = this.studentRepository.create({ ...dto });
    return await this.studentRepository.save(createdStudent);
  }
}
