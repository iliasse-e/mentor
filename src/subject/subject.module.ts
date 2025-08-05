import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelModule } from 'src/level/level.module';
import { SubjectController } from './subject.controller';
import { SubjectEntity } from './subject.entity';
import { SubjectService } from './subject.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubjectEntity]),
    forwardRef(() => LevelModule),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
