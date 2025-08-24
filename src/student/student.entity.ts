import { CourseEntity } from 'src/course/course.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ orderBy: { id: 'ASC' } })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastname: string;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'double', nullable: true })
  rating: number;

  @OneToMany(() => CourseEntity, (course) => course.student)
  courses: CourseEntity[];

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
