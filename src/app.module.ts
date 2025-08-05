import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mentor',
      synchronize: true,
      autoLoadEntities: true,
    }),
    SubjectModule,
    LevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
