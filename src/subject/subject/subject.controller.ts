import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubjectDTO } from './model/subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.subjectService.getSubject(Number(id));
  }

  @Post()
  create(@Body() subject: CreateSubjectDTO) {
    return this.subjectService.createSubject(subject);
  }

  @Put()
  update(@Param('id') id: string, @Body() subject: CreateSubjectDTO) {
    return this.subjectService.updateSubject(Number(id), subject);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subjectService.deleteSubject(Number(id));
  }
}
