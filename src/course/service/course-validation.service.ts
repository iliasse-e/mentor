import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MentorEntity } from 'src/mentor/mentor.entity';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { Repository } from 'typeorm';
import { CreateCourseDTO, UpdateCourseDTO } from '../course.dto';

@Injectable()
export class CourseValidationService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
    @InjectRepository(MentorEntity)
    private readonly mentorRepository: Repository<MentorEntity>,
  ) {}

  /**
   * Checks if relations (student, mentor, subject) exists into database,
   * Throw an error if it goes wrong with any of the relations
   * @param dto
   * @returns Object of subject, student, mentor
   */
  async resolveCourseRelations(
    dto: CreateCourseDTO | UpdateCourseDTO,
  ): Promise<{
    subject: SubjectEntity;
    student: StudentEntity;
    mentor: MentorEntity;
  }> {
    const [subject, student, mentor] = await Promise.all([
      this.subjectRepository.findOneBy({ id: Number(dto.subjectId) }),
      this.studentRepository.findOneBy({ id: Number(dto.studentId) }),
      this.mentorRepository.findOneBy({ id: dto.mentorId }),
    ]);

    if (!subject || !student || !mentor) {
      throw new NotFoundException('Subject, student ou mentor not found');
    }

    return { subject, student, mentor };
  }
}
