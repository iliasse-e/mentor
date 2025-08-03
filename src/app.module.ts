import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [SubjectModule, LevelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
