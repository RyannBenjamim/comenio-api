import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstituicoesService } from './instituicoes.service';
import { CreateInstituicoeDto } from './dto/create-instituicoe.dto';
import { UpdateInstituicoeDto } from './dto/update-instituicoe.dto';

@Controller('instituicoes')
export class InstituicoesController {
  constructor(private readonly instituicoesService: InstituicoesService) {}

  @Post()
  create(@Body() createInstituicoeDto: CreateInstituicoeDto) {
    return this.instituicoesService.create(createInstituicoeDto);
  }

  @Get()
  findAll() {
    return this.instituicoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituicoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituicoeDto: UpdateInstituicoeDto) {
    return this.instituicoesService.update(+id, updateInstituicoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituicoesService.remove(+id);
  }
}
