import { CourseEntity } from 'src/course/course.entity';
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StudentEntity {
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

  @ManyToMany(() => CourseEntity, { eager: false, nullable: true })
  courses: CourseEntity[];
}
