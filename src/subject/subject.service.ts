import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { Repository } from 'typeorm';
import { CreateSubjectDTO } from './subject.dto';
import { SubjectEntity } from './subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(forwardRef(() => LevelService))
    private levelRepository: LevelService,
  ) {}

  findAll(): Promise<SubjectEntity[]> {
    // SELECT * FROM subject_entity ORDER BY id;
    return this.subjectRepository.find({ order: { id: 'ASC' } });
  }

  getSubject(id: number): Promise<SubjectEntity | null> {
    return this.subjectRepository.findOneBy({ id });
  }

  async updateSubject(
    id: number,
    updatedSubject: CreateSubjectDTO,
  ): Promise<void> {
    const subject = await this.subjectRepository.findOne({ where: { id } });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    if (updatedSubject.name !== undefined) {
      subject.name = updatedSubject.name;
    }

    // Go find level to add to subject creation
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

    await this.subjectRepository.save(subject);
  }

  async deleteSubject(id: number): Promise<void> {
    const isExistingSubject = await this.subjectRepository.exists({
      where: { id },
    });

    if (!isExistingSubject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    await this.subjectRepository.delete({ id });
  }

  async createSubject(subject: CreateSubjectDTO): Promise<SubjectEntity> {
    // Checks if subject already exists (for this level)
    const existingSubject = await this.subjectRepository.findOne({
      where: {
        name: subject.name,
        level: { id: subject.levelId },
      },
    });

    if (existingSubject) {
      throw new ConflictException(
        `Subject '${subject.name}' already exists for level ${subject.levelId}`,
      );
    }

    const createSubject = this.subjectRepository.create({ ...subject });

    // Go find level to add to subject creation
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
