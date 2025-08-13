import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectService } from 'src/subject/subject.service';
import { DataSource, Repository } from 'typeorm';
import { CreateLevelDTO, UpdateLevelDTO } from './level.dto';
import { LevelEntity } from './level.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
    @Inject(forwardRef(() => SubjectService))
    private readonly subjectService: SubjectService,
    private readonly dataSource: DataSource,
  ) {}

  findAll(): Promise<LevelEntity[]> {
    return this.levelRepository.find();
  }

  async findSubjectsByLevelName(name: string): Promise<any> {
    const level = await this.getLevelByName(name);
    if (!level) {
      throw new NotFoundException(`Level with name "${name}" not found.`);
    }

    const filterSubjects = (await this.subjectService.findAll()).filter(
      (subject) => subject.id === level?.id,
    );

    const response = filterSubjects.map((subject) => ({
      level: { id: level.id, name: level.name },
      subject: {
        id: subject.id,
        name: subject.name,
        levelId: subject.level?.id,
      },
    }));

    return response;
  }

  getLevel(id: number): Promise<LevelEntity | null> {
    return this.levelRepository.findOneBy({ id });
  }

  getLevelByName(name: string): Promise<LevelEntity | null> {
    return this.levelRepository.findOneBy({ name });
  }

  async updateLevel(id: number, level: UpdateLevelDTO): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(LevelEntity)
      .set({ name: level.name })
      .where('id = :id', { id: id })
      .execute();
  }

  async deleteLevel(id: number): Promise<void> {
    const isExistingLevel = await this.levelRepository.findOne({
      where: { id: id },
    });

    if (!isExistingLevel) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }

    await this.levelRepository.delete({ id });
  }

  async createLevel(level: CreateLevelDTO): Promise<LevelEntity> {
    const isExistingLevel = await this.levelRepository.findOne({
      where: {
        name: level.name,
      },
    });

    if (isExistingLevel) {
      throw new ConflictException(`Level '${level.name}' already exists`);
    }

    const createdLevel = this.levelRepository.create({ ...level });
    return this.levelRepository.save(createdLevel);
  }
}
