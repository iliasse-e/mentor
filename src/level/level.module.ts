import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from 'src/subject/subject.module';
import { LevelController } from './level.controller';
import { LevelEntity } from './level.entity';
import { LevelService } from './level.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LevelEntity]),
    forwardRef(() => SubjectModule),
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
