import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Post()
  createOne(course: CreateCourseDTO) {
    return this.courseService.create(course);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.courseService.deleteOne(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() course: UpdateCourseDTO) {
    return this.courseService.updateOne(id, course);
  }
}
