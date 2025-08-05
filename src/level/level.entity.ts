import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
