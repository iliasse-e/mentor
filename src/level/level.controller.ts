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
import { CreateLevelDTO } from './level.model';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @Get()
  getAll() {
    return this.levelService.findAll();
  }

  @Get('subject/:name')
  getSubjectsByLevelName(@Param('name') name: string) {
    return this.levelService.findSubjectsByLevelName(name);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.levelService.getLevel(id);
  }

  @Post()
  create(@Body() level: CreateLevelDTO) {
    return this.levelService.createLevel(level);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() level: CreateLevelDTO) {
    return this.levelService.updateLevel(id, level);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.levelService.deleteLevel(id);
  }
}
