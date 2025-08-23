import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorEntity } from '.././mentor/mentor.entity';
import { StudentEntity } from '.././student/student.entity';
import { SubjectEntity } from '.././subject/subject.entity';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseSeeder {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(MentorEntity)
    private readonly mentorRepository: Repository<MentorEntity>,
  ) {}

  async seed() {
    const subjects = await this.subjectRepository.find();
    const students = await this.studentRepository.find();
    const mentors = await this.mentorRepository.find();

    if (!subjects.length || !students.length || !mentors.length) {
      console.warn(
        '⚠️ Impossible de créer des cours : données liées manquantes.',
      );
      return;
    }

    const sampleCourses = [
      {
        duration: 2.5,
        rating: 4.8,
        subjectName: 'Mathématiques',
        studentEmail: 'alice@example.com',
        mentorEmail: 'jean.dupont@example.com',
        datetime: '2025-08-22T10:00:00',
      },
      {
        duration: 1.5,
        rating: 4.2,
        subjectName: 'Programmation',
        studentEmail: 'chloe@example.com',
        mentorEmail: 'sophie.moreau@example.com',
        datetime: '2025-08-23T14:30:00',
      },
    ];

    for (const data of sampleCourses) {
      const subject = subjects.find((s) => s.name === data.subjectName);
      const student = students.find((s) => s.email === data.studentEmail);
      const mentor = mentors.find((m) => m.email === data.mentorEmail);

      if (subject && student && mentor) {
        const course = this.courseRepository.create({
          duration: data.duration,
          rating: data.rating,
          subject,
          student,
          mentor,
          datetime: data.datetime,
        });

        await this.courseRepository.save(course);
      }
    }

    console.log('✅ Courses seeded');
  }
}
