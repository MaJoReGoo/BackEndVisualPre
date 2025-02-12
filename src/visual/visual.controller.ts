import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisualService } from './visual.service';
import { CreateVisualDto } from './dto/create-visual.dto';
import { UpdateVisualDto } from './dto/update-visual.dto';

@Controller('visual')
export class VisualController {
  constructor(private readonly visualService: VisualService) {}

  @Post()
  create(@Body() createVisualDto: CreateVisualDto) {
    return this.visualService.create(createVisualDto);
  }

  @Get()
  findAll() {
    return this.visualService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.visualService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisualDto: UpdateVisualDto) {
    return this.visualService.update(+id, updateVisualDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visualService.remove(+id);
  }
}
