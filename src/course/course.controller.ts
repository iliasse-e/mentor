import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { CourseService } from './service/course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Post()
  createOne(@Body() course: CreateCourseDTO) {
    return this.courseService.create(course);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    await this.courseService.deleteOne(id);
    return { message: `Course ${id} deleted successfully` };
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() course: UpdateCourseDTO,
  ) {
    return this.courseService.updateOne(id, course);
  }
}
