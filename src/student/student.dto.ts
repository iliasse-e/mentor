import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ResponseStudentDTO {
  @IsString()
  id: number;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsNumber()
  rating: number;

  @IsArray()
  @IsInt({ each: true })
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

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {
  @IsOptional()
  @IsNumber()
  rating?: number;
}
