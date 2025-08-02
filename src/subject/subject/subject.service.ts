import { Injectable } from '@nestjs/common';
import { SUBJECT_DB } from './db';
import { Subject } from './subject.model';

@Injectable()
export class SubjectService {
  findAll(): Promise<Subject[]> {
    return Promise.resolve(SUBJECT_DB);
  }

  getSubject(id: number): Promise<Subject | undefined> {
    const subject = SUBJECT_DB.find((s: Subject) => s.id === id);
    return Promise.resolve(subject);
  }

  updateSubject(id: number, newSubject: Subject): Promise<Subject | undefined> {
    SUBJECT_DB.map((s: Subject) => {
      if (s.id === id) {
        return newSubject;
      } else {
        return s;
      }
    });

    return Promise.resolve(SUBJECT_DB.find((s: Subject) => s.id === id));
  }

  deleteSubject(id: number): Promise<any> {
    const index = SUBJECT_DB.findIndex((s) => s.id === id);
    SUBJECT_DB.splice(index, 1);
    return Promise.resolve();
  }

  createSubject(subject: Subject): Promise<Subject> {
    SUBJECT_DB.push(subject);
    return Promise.resolve(SUBJECT_DB[SUBJECT_DB.length - 1]);
  }
}
