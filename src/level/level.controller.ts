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
import { CreateLevelDTO, ResponseLevelDTO } from './level.dto';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private levelService: LevelService) {}

  @Get()
  getAll(): Promise<ResponseLevelDTO[]> {
    return this.levelService.findAll();
  }

  @Get('subject/:name')
  getSubjectsByLevelName(@Param('name') name: string): Promise<void> {
    return this.levelService.findSubjectsByLevelName(name);
  }

  @Get(':id')
  getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseLevelDTO | null> {
    return this.levelService.getLevel(id);
  }

  @Post()
  create(@Body() level: CreateLevelDTO): Promise<ResponseLevelDTO> {
    return this.levelService.createLevel(level);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() level: CreateLevelDTO,
  ): Promise<void> {
    return this.levelService.updateLevel(id, level);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.levelService.deleteLevel(id);
  }
}
