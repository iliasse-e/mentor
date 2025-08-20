import { IsArray, IsEmail, IsString } from 'class-validator';
import { ResponseSubjectDTO } from 'src/subject/subject.dto';

export class ResponseMentorDTO {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  subjects: ResponseSubjectDTO[];
}

export class CreateMentorDTO {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsArray()
  subjectIds: string[];
}

export class UpdateMentorDTO {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsArray()
  subjectIds: string[];
}
