import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelEntity } from './level.entity';

@Injectable()
export class LevelSeeder {
  constructor(
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
  ) {}

  async seed() {
    const levels = ['Primaire', 'Collège', 'Lycée', 'Université'];

    for (const name of levels) {
      const exists = await this.levelRepository.findOne({ where: { name } });
      if (!exists) {
        await this.levelRepository.save(this.levelRepository.create({ name }));
      }
    }

    console.log('✅ Levels seeded');
  }
}
