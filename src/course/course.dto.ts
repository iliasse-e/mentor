import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';
import { ResponseMentorDTO } from 'src/mentor/mentor.dto';
import { ResponseStudentDTO } from 'src/student/student.dto';
import { ResponseSubjectDTO } from 'src/subject/subject.dto';

export class ResponseCourseDTO {
  @IsString()
  id: string;

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

  @IsNumber()
  rating: number;

  @IsUUID()
  subjectId: string;

  @IsUUID()
  studentId: string;

  @IsUUID()
  mentorId: string;

  @IsDate()
  datetime: Date;
}

export class UpdateCourseDTO {
  @IsNumber()
  duration: number;

  @IsNumber()
  rating: number;

  @IsUUID()
  subjectId: string;

  @IsUUID()
  studentId: string;

  @IsUUID()
  mentorId: string;

  @IsDate()
  datetime: Date;
}
