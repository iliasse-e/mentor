import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectService } from 'src/subject/subject.service';
import { DataSource, Repository } from 'typeorm';
import { LevelEntity } from './level.entity';
import { CreateLevelDTO, SubjectLevel } from './level.model';

@Injectable()
export class LevelService {
  constructor(
    private readonly subjectService: SubjectService,
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<LevelEntity[]> {
    return this.levelRepository.find();
  }

  async findSubjectsByLevelName(
    name: string,
  ): Promise<SubjectLevel[] | undefined> {
    try {
      const level = await this.getLevelByName(name);
      if (!level) {
        throw new Error(`Level with name "${name}" not found.`);
      }

      const filterSubjects = (await this.subjectService.findAll()).filter(
        (subject) => subject.id === level?.id,
      );
      const response = filterSubjects.map((subject) => ({
        level,
        subject: { id: subject.id, name: subject.name, levelId: subject.level },
      }));

      return response;
    } catch (error) {
      throw Error(error);
    }
  }

  getLevel(id: number): Promise<LevelEntity | null> {
    return this.levelRepository.findOneBy({ id });
  }

  getLevelByName(name: string): Promise<LevelEntity | null> {
    return this.levelRepository.findOneBy({ name });
  }

  async updateLevel(id: number, level: CreateLevelDTO): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(LevelEntity)
      .set({ name: level.name })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteLevel(id: number): Promise<void> {
    await this.levelRepository.delete({ id });
  }

  createLevel(level: CreateLevelDTO): Promise<LevelEntity> {
    const createdLevel = this.levelRepository.create({ ...level });
    return this.levelRepository.save(createdLevel);
  }
}
