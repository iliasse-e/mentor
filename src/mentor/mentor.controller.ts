import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMentorDTO, UpdateMentorDTO } from './mentor.dto';
import { MentorService } from './mentor.service';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @Get()
  findAll() {
    return this.mentorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentorService.findOne(id);
  }

  @Post()
  create(@Body() mentor: CreateMentorDTO): Promise<any> {
    return this.mentorService.create(mentor);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() mentor: UpdateMentorDTO,
  ): Promise<void> {
    return this.mentorService.updateOne(id, mentor);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.mentorService.deleteOne(id);
  }
}
