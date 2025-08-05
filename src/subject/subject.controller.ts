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
import { CreateSubjectDTO, ResponseSubjectDTO } from './subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  getAll(): Promise<ResponseSubjectDTO[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseSubjectDTO | null> {
    return this.subjectService.getSubject(id);
  }

  @Post()
  create(@Body() subject: CreateSubjectDTO): Promise<ResponseSubjectDTO> {
    return this.subjectService.createSubject(subject);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() subject: CreateSubjectDTO,
  ): Promise<void> {
    return this.subjectService.updateSubject(id, subject);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subjectService.deleteSubject(id);
  }
}
