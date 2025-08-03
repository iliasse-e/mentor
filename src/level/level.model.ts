import { Subject } from 'src/subject/subject.model';

export type Level = {
  id: number;
  name: string;
};

export type SubjectLevel = {
  level: Level;
  subject: Subject;
};

export type CreateLevelDTO = {
  name: string;
};
