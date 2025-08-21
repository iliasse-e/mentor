import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CourseSeeder } from 'src/course/course.seed';
import { MentorSeeder } from 'src/mentor/mentor.seed';
import { LevelSeeder } from '../level/level.seed';
import { StudentSeeder } from '../student/student.seed';
import { SubjectSeeder } from '../subject/subject.seed';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private readonly levelSeeder: LevelSeeder,
    private readonly studentSeeder: StudentSeeder,
    private readonly subjectSeeder: SubjectSeeder,
    private readonly mentorSeeder: MentorSeeder,
    private readonly courseSeeder: CourseSeeder,
  ) {}

  async onApplicationBootstrap() {
    await this.levelSeeder.seed();
    await this.subjectSeeder.seed();
    await this.studentSeeder.seed();
    await this.mentorSeeder.seed();
    await this.courseSeeder.seed();
  }
}
