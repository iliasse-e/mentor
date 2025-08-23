import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorEntity } from 'src/mentor/mentor.entity';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';
import { CourseMapper } from './course.mapper';
import { CourseValidationService } from './service/course-validation.service';
import { CourseService } from './service/course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity]),
    TypeOrmModule.forFeature([StudentEntity]),
    TypeOrmModule.forFeature([SubjectEntity]),
    TypeOrmModule.forFeature([MentorEntity]),
  ],
  providers: [CourseService, CourseMapper, CourseValidationService],
  controllers: [CourseController],
})
export class CourseModule {}
