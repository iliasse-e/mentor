import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubjectDTO } from './subject.model';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.getSubject(id);
  }

  @Post()
  create(@Body() subject: CreateSubjectDTO) {
    return this.subjectService.createSubject(subject);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() subject: CreateSubjectDTO,
  ) {
    return this.subjectService.updateSubject(id, subject);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.deleteSubject(id);
  }
}
