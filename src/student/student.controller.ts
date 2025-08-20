import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStudentDTO, UpdateStudentDTO } from './student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Post()
  createOne(student: CreateStudentDTO) {
    return this.studentService.create(student);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.studentService.deleteOne(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, student: UpdateStudentDTO) {
    return this.studentService.updateOne(id, student);
  }
}
