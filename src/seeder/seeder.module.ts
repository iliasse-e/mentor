import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/course/course.entity';
import { CourseSeeder } from 'src/course/course.seed';
import { LevelEntity } from 'src/level/level.entity';
import { LevelSeeder } from 'src/level/level.seed';
import { MentorEntity } from 'src/mentor/mentor.entity';
import { MentorSeeder } from 'src/mentor/mentor.seed';
import { StudentEntity } from 'src/student/student.entity';
import { StudentSeeder } from 'src/student/student.seed';
import { SubjectEntity } from 'src/subject/subject.entity';
import { SubjectSeeder } from 'src/subject/subject.seed';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LevelEntity,
      StudentEntity,
      SubjectEntity,
      MentorEntity,
      CourseEntity,
    ]),
  ],
  providers: [
    SeederService,
    LevelSeeder,
    StudentSeeder,
    SubjectSeeder,
    MentorSeeder,
    CourseSeeder,
  ],
})
export class SeederModule {}
