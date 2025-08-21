import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';

@Injectable()
export class StudentSeeder {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async seed() {
    const students = [
      {
        firstname: 'Alice',
        lastname: 'Durand',
        email: 'alice@example.com',
        rating: 4.5,
      },
      {
        firstname: 'Bob',
        lastname: 'Martin',
        email: 'bob@example.com',
        rating: 3.8,
      },
      {
        firstname: 'Chloé',
        lastname: 'Lemoine',
        email: 'chloe@example.com',
        rating: 4.9,
      },
    ];

    for (const data of students) {
      const exists = await this.studentRepository.findOne({
        where: { email: data.email },
      });
      if (!exists) {
        await this.studentRepository.save(this.studentRepository.create(data));
      }
    }

    console.log('✅ Students seeded');
  }
}
