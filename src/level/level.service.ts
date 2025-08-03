import { Injectable } from '@nestjs/common';
import { Subject } from 'src/subject/subject.model';
import { SubjectService } from 'src/subject/subject.service';
import { LEVEL_DB } from './db';
import { Level, SubjectLevel } from './level.model';

@Injectable()
export class LevelService {
  constructor(private readonly subjectService: SubjectService) {}

  findAll(): Promise<Level[]> {
    return Promise.resolve(LEVEL_DB);
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
        (subject: Subject) => subject.levelId === level?.id,
      );
      const response = filterSubjects.map((subject: Subject) => ({
        level,
        subject,
      }));
      return response;
    } catch (error) {
      throw Error(error);
    }
  }

  getLevel(id: number): Promise<Level | undefined> {
    const Level = LEVEL_DB.find((level: Level) => level.id === id);
    return Promise.resolve(Level);
  }

  getLevelByName(name: string): Promise<Level | undefined> {
    const Level = LEVEL_DB.find((level: Level) => level.name === name);
    return Promise.resolve(Level);
  }

  updateLevel(
    id: number,
    newLevel: Omit<Level, 'id'>,
  ): Promise<Level | undefined> {
    LEVEL_DB.map((level: Level) => {
      if (level.id === id) {
        return newLevel;
      } else {
        return level;
      }
    });

    return Promise.resolve(LEVEL_DB.find((level: Level) => level.id === id));
  }

  deleteLevel(id: number): Promise<any> {
    const index = LEVEL_DB.findIndex((level) => level.id === id);
    LEVEL_DB.splice(index, 1);
    return Promise.resolve();
  }

  createLevel(Level: Omit<Level, 'id'>): Promise<Level> {
    LEVEL_DB.push({ id: LEVEL_DB.length, ...Level });
    return Promise.resolve(LEVEL_DB[LEVEL_DB.length - 1]);
  }
}
