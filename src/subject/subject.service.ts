import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { Repository } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { CreateSubjectDTO } from './subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(forwardRef(() => LevelService))
    private levelRepository: LevelService,
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

    if (
      updatedSubject.levelId !== undefined &&
      updatedSubject.levelId !== subject.level?.id
    ) {
      const levelId = updatedSubject.levelId;
      const selectedLevel = await this.levelRepository.getLevel(levelId);
      if (!selectedLevel) {
        throw new NotFoundException(`Level with ID ${levelId} not found`);
      }
      subject.level = selectedLevel;
    }

    return await this.subjectRepository.save(subject);
  }

  async deleteSubject(id: number): Promise<void> {
    await this.subjectRepository.delete({ id });
  }

  async createSubject(subject: CreateSubjectDTO): Promise<SubjectEntity> {
    const createSubject = this.subjectRepository.create({ ...subject });

    if (subject.levelId !== undefined) {
      const selectedLevel = await this.levelRepository.getLevel(
        subject.levelId,
      );
      if (!selectedLevel) {
        throw new NotFoundException(
          `Level with ID ${subject.levelId} not found`,
        );
      }
      createSubject.level = selectedLevel;
    }

    return this.subjectRepository.save(createSubject);
  }
}
