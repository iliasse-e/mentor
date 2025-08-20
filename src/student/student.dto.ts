import { IsArray, IsEmail, IsNumber, IsString } from 'class-validator';

export class ResponseStudentDTO {
  @IsString()
  id: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNumber()
  rating: number;

  @IsArray()
  courses: ResponseStudentDTO[];
}

export class CreateStudentDTO {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;
}

export class UpdateStudentDTO {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsNumber()
  rating: number;

  @IsArray()
  courses: any[];
}
