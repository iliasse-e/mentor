import { MentorEntity } from 'src/mentor/mentor.entity';
import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'double', nullable: true })
  duration: number;

  @Column({ type: 'double', nullable: true })
  rating: number;

  @ManyToOne(() => SubjectEntity, { eager: false })
  subject: SubjectEntity;

  @ManyToOne(() => StudentEntity, { eager: false })
  student: StudentEntity;

  @ManyToOne(() => MentorEntity, { eager: false })
  mentor: MentorEntity;

  @Column({ type: 'datetime' })
  datetime: Date;
}
