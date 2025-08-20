import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMentorDTO, UpdateMentorDTO } from './mentor.dto';
import { MentorEntity } from './mentor.entity';

@Injectable()
export class MentorService {
  constructor(
    @InjectRepository(MentorEntity)
    private readonly mentorRepository: Repository<MentorEntity>,
  ) {}

  findAll(): Promise<MentorEntity[]> {
    return this.mentorRepository.find();
  }

  findOne(id: string): Promise<MentorEntity | null> {
    return this.mentorRepository.findOneBy({ id });
  }

  async create(mentor: CreateMentorDTO): Promise<MentorEntity> {
    const isExistingmentor = await this.mentorRepository.findOne({
      where: {
        email: mentor.email,
      },
    });

    if (isExistingmentor) {
      throw new ConflictException(
        `mentor with email '${mentor.email}' already exists`,
      );
    }

    const createdMentor = this.mentorRepository.create({ ...mentor });

    return this.mentorRepository.save(createdMentor);
  }

  async deleteOne(id: string) {
    await this.mentorRepository.delete({ id });
  }

  async updateOne(id: string, mentor: UpdateMentorDTO) {
    const existingMentor = await this.mentorRepository.findOne({
      where: { id: id },
    });

    if (!existingMentor) {
      throw new NotFoundException(`mentor with ID ${id} not found`);
    }

    existingMentor.firstname = mentor.firstname; // TODO : refactor

    await this.mentorRepository.save(existingMentor);
  }
}
