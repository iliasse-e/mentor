import { IsString } from 'class-validator';

export class ResponseLevelDTO {
  id: number;
  name: string;
}

export class CreateLevelDTO {
  @IsString()
  name: string;
}

export class UpdateLevelDTO {
  @IsString()
  name: string;
}
