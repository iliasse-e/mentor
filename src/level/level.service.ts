import { Injectable } from '@nestjs/common';
import { LEVEL_DB } from './db';
import { Level } from './level.model';

@Injectable()
export class LevelService {
  findAll(): Promise<Level[]> {
    return Promise.resolve(LEVEL_DB);
  }

  getLevel(id: number): Promise<Level | undefined> {
    const Level = LEVEL_DB.find((s: Level) => s.id === id);
    return Promise.resolve(Level);
  }

  updateLevel(
    id: number,
    newLevel: Omit<Level, 'id'>,
  ): Promise<Level | undefined> {
    LEVEL_DB.map((s: Level) => {
      if (s.id === id) {
        return newLevel;
      } else {
        return s;
      }
    });

    return Promise.resolve(LEVEL_DB.find((s: Level) => s.id === id));
  }

  deleteLevel(id: number): Promise<any> {
    const index = LEVEL_DB.findIndex((s) => s.id === id);
    LEVEL_DB.splice(index, 1);
    return Promise.resolve();
  }

  createLevel(Level: Omit<Level, 'id'>): Promise<Level> {
    LEVEL_DB.push({ id: LEVEL_DB.length, ...Level });
    return Promise.resolve(LEVEL_DB[LEVEL_DB.length - 1]);
  }
}
