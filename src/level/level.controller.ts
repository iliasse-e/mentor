import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  getOne(@Param('id') id: string) {
    return this.levelService.getLevel(Number(id));
  }

  @Post()
  create(@Body() level: CreateLevelDTO) {
    return this.levelService.createLevel(level);
  }

  @Put()
  update(@Param('id') id: string, @Body() level: CreateLevelDTO) {
    return this.levelService.updateLevel(Number(id), level);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.levelService.deleteLevel(Number(id));
  }
}
