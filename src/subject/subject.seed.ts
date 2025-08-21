import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelEntity } from './../level/level.entity';
import { SubjectEntity } from './subject.entity';

@Injectable()
export class SubjectSeeder {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
  ) {}

  async seed() {
    const levels = await this.levelRepository.find();
    if (levels.length === 0) {
      console.warn(
        '⚠️ Aucun niveau trouvé. Les matières ne seront pas seedées.',
      );
      return;
    }

    const subjects = [
      { name: 'Mathématiques', levelId: 1 },
      { name: 'Physique', levelId: 2 },
      { name: 'Philosophie', levelId: 3 },
      { name: 'Programmation', levelId: 4 },
    ];

    for (const { name, levelId } of subjects) {
      const level = levels.find((l) => l.id === levelId);

      if (!level) {
        console.warn(
          `⚠️ Niveau ID : "${levelId}" introuvable pour la matière "${name}".`,
        );
        continue;
      }

      const exists = await this.subjectRepository.findOne({ where: { name } });
      if (exists) {
        console.log(`ℹ️ La matière "${name}" existe déjà.`);
        continue;
      }

      const newSubject = this.subjectRepository.create({ name, level });

      await this.subjectRepository.save(newSubject);
      console.log(`✅ Matière "${name}" créée avec le niveau "${level.name}".`);
    }
  }
}
