import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { LevelModule } from './level/level.module';
import { MentorModule } from './mentor/mentor.module';
import { SeederModule } from './seeder/seeder.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'mentor',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      dropSchema: true, // TODO : delete this line to avoid table drops
    }),
    SubjectModule,
    LevelModule,
    MentorModule,
    StudentModule,
    CourseModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
