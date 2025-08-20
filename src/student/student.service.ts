import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO, UpdateStudentDTO } from './student.dto';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    readonly studentRepository: Repository<StudentEntity>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: string) {
    return this.studentRepository.findOneBy({ id });
  }

  async deleteOne(id: string) {
    await this.studentRepository.delete({ id });
  }

  async updateOne(id: string, student: UpdateStudentDTO) {
    const existingstudent = await this.studentRepository.findOne({
      where: { id: id },
    });

    if (!existingstudent) {
      throw new NotFoundException(`student with ID ${id} not found`);
    }

    existingstudent.firstname = student.firstname; // TODO : refactor

    await this.studentRepository.save(existingstudent);
  }

  async create(student: CreateStudentDTO) {
    const createdStudent = this.studentRepository.create({ ...student });
    await this.studentRepository.save(createdStudent);
  }
}
