import { ResponseLevelDTO } from 'src/level/level.dto';

export type ResponseSubjectDTO = {
  id: number;
  name: string;
  level?: ResponseLevelDTO;
};

export type CreateSubjectDTO = {
  name: string;
  levelId: number;
};

export type UpdateSubjectDTO = {
  name: string;
  levelId: number;
};
