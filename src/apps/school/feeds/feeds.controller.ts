import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, Request } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { Feed } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../common/interfaces/AuthenticatedRequest';

@Controller('api/feeds')
export class FeedsController {
  constructor(private readonly feedsService: FeedsService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createFeedDto: CreateFeedDto
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.create(createFeedDto, req.user.instituicaoId);
    return {
      message: 'Feed criado com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Feed[]>> {
    const response = await this.feedsService.findAll(req.user.instituicaoId);
    return {
      message: 'Feeds listados com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Feed buscado com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateFeedDto: UpdateFeedDto
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.update(id, updateFeedDto, req.user.instituicaoId);
    return {
      message: 'Feed atualizado com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Feed>> {
    const response = await this.feedsService.remove(id, req.user.instituicaoId);
    return {
      message: `Feed ${response.titulo} deletado com sucesso.`,
      data: response
    };
  }
}

