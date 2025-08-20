import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: string) {
    return this.courseRepository.findOneBy({ id });
  }

  async deleteOne(id: string) {
    await this.courseRepository.delete({ id });
  }

  updateOne(id: string, course: UpdateCourseDTO) {}

  async create(course: CreateCourseDTO) {
    const createCourse = this.courseRepository.create({ ...course });
    await this.courseRepository.save(createCourse);
  }
}
