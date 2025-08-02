import { Controller, Get, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getSubjects() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  getSubject(@Param('id') id: string) {
    return this.subjectService.getSubject(Number(id));
  }
}
