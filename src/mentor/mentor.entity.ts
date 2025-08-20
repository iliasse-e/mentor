import { StudentEntity } from 'src/student/student.entity';
import { SubjectEntity } from 'src/subject/subject.entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MentorEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastname: string;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'double', nullable: true })
  rating: number;

  @ManyToMany(() => SubjectEntity)
  subjects: SubjectEntity[];

  @ManyToMany(() => StudentEntity)
  students: StudentEntity[];
}
