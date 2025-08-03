import { Module } from '@nestjs/common';
import { SubjectService } from 'src/subject/subject.service';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';

@Module({
  controllers: [LevelController],
  providers: [LevelService, SubjectService],
})
export class LevelModule {}
