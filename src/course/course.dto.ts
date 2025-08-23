import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ResponseMentorDTO } from 'src/mentor/mentor.dto';
import { ResponseStudentDTO } from 'src/student/student.dto';
import { ResponseSubjectDTO } from 'src/subject/subject.dto';

export class ResponseCourseDTO {
  @IsString()
  id: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  rating: number;

  @IsString()
  subject: ResponseSubjectDTO;

  @IsString()
  student: ResponseStudentDTO;

  @IsString()
  mentor: ResponseMentorDTO;

  @IsDate()
  datetime: Date;
}

export class CreateCourseDTO {
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsNumber()
  subjectId: string;

  @IsNumber()
  studentId: string;

  @IsNumber()
  mentorId: string;

  @IsDateString()
  datetime: Date;
}

// Allow properties to be optional (either we should use @IsOptional())
export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}
