// src/mentor/seed/mentor.seed.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorEntity } from './mentor.entity';

@Injectable()
export class MentorSeeder {
  constructor(
    @InjectRepository(MentorEntity)
    private readonly mentorRepository: Repository<MentorEntity>,
  ) {}

  async seed() {
    const mentors = [
      {
        firstname: 'Jean',
        lastname: 'Dupont',
        email: 'jean.dupont@example.com',
      },
      {
        firstname: 'Sophie',
        lastname: 'Moreau',
        email: 'sophie.moreau@example.com',
      },
    ];

    for (const mentorData of mentors) {
      const exists = await this.mentorRepository.findOne({
        where: { email: mentorData.email },
      });
      if (exists) continue;

      const mentor = this.mentorRepository.create({
        firstname: mentorData.firstname,
        lastname: mentorData.lastname,
        email: mentorData.email,
      });

      await this.mentorRepository.save(mentor);
    }

    console.log('✅ Mentors seeded');
  }
}
