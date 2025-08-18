import { IsInt, IsPositive, IsString } from 'class-validator';
import { ResponseLevelDTO } from 'src/level/level.dto';

export class ResponseSubjectDTO {
  id: number;
  name: string;
  level?: ResponseLevelDTO;
}

export class CreateSubjectDTO {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  levelId: number;
}

export class UpdateSubjectDTO {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  levelId: number;
}
