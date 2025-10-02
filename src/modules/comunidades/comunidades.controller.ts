import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComunidadesService } from './comunidades.service';
import { CreateComunidadeDto } from './dto/create-comunidade.dto';
import { UpdateComunidadeDto } from './dto/update-comunidade.dto';

@Controller('comunidades')
export class ComunidadesController {
  constructor(private readonly comunidadesService: ComunidadesService) {}

  @Post()
  create(@Body() createComunidadeDto: CreateComunidadeDto) {
    return this.comunidadesService.create(createComunidadeDto);
  }

  @Get()
  findAll() {
    return this.comunidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comunidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComunidadeDto: UpdateComunidadeDto) {
    return this.comunidadesService.update(+id, updateComunidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comunidadesService.remove(+id);
  }
}
