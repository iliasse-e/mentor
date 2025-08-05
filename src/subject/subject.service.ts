import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { CreateSubjectDTO } from './subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  findAll(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
  }

  getSubject(id: number): Promise<SubjectEntity | null> {
    return this.subjectRepository.findOneBy({ id });
  }

  async updateSubject(
    id: number,
    updatedSubject: CreateSubjectDTO,
  ): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOne({ where: { id } });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    if (updatedSubject.name !== undefined) {
      subject.name = updatedSubject.name;
    }

    if (updatedSubject.levelId !== undefined) {
      subject.level = updatedSubject.levelId;
    }

    return await this.subjectRepository.save(subject);
  }

  async deleteSubject(id: number): Promise<void> {
    await this.subjectRepository.delete({ id });
  }

  createSubject(subject: CreateSubjectDTO): Promise<SubjectEntity> {
    const createSubject = this.subjectRepository.create({ ...subject });
    return this.subjectRepository.save(createSubject);
  }
}
