import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { Feed } from '@prisma/client';
import { ValidateUUIDPipe } from '../../common/pipes/ValideUUIDPipe';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import type { ApiResponse } from '../../common/interfaces/ApiResponse';

@Controller('feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createFeedDto: CreateFeedDto
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.create(createFeedDto);
    return {
      message: 'Feed criado com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Feed[]>> {
    const response = await this.feedsService.findAll();
    return {
      message: 'Feeds listados com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.findOne(id);
    return {
      message: 'Feed buscado com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateFeedDto: UpdateFeedDto
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.update(id, updateFeedDto);
    return {
      message: 'Feed atualizado com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.remove(id);
    return {
      message: `Feed ${response.titulo} deletado com sucesso.`,
      data: response
    };
  }
}

