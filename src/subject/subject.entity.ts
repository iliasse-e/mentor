import { LevelEntity } from 'src/level/level.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 150 })
  name: string;

  @ManyToOne(() => LevelEntity)
  level?: LevelEntity;
}
