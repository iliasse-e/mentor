import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorController } from './mentor.controller';
import { MentorEntity } from './mentor.entity';
import { MentorService } from './mentor.service';

@Module({
  imports: [TypeOrmModule.forFeature([MentorEntity])],
  providers: [MentorService],
  controllers: [MentorController],
})
export class MentorModule {}
