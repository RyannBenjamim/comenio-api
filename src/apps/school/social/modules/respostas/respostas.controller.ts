import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe, Request, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RespostasService } from './respostas.service';
import { Resposta } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from "../../../../../common/interfaces/AuthenticatedRequest";
import { SocialContextResolverGuard } from '../../guards/social-context-resolver.guard';
import { ContextAccessGuard } from '../../../../../common/guards/context-access.guard';
import { ImageFilePipe } from 'src/common/pipes/ImageFilePipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { RespostaResponseDto } from './dto/resposta-response.dto';

@Controller('api/respostas')
export class RespostasController {
  constructor(private readonly respostasService: RespostasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreateRespostaDto,
    @UploadedFile(ImageFilePipe()) file?: Express.Multer.File
  ): Promise<ApiResponse<Resposta>> {
    const user = req.user;

    const response = await this.respostasService.create(
      createDto,
      user,
      file
    );

    return {
      message: 'Resposta criada com sucesso.',
      data: response
    };
  }

  @Get()
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('postId', ValidateUUIDPipe) postId?: string,
    @Query('respostaId', ValidateUUIDPipe) respostaId?: string,
  ): Promise<ApiResponse<RespostaResponseDto[]>> {
    const response = await this.respostasService.findAll(req.user.instituicaoId, postId, respostaId);
    return {
      message: 'Respostas listadas com sucesso.',
      data: response
    };
  }

  @Get('me')
  async findAllByUserId(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<RespostaResponseDto[]>> {
    const { id: userId, instituicaoId } = req.user;
    const response = await this.respostasService.findAllByUserId(userId, instituicaoId);
    return {
      message: 'Minhas respostas listadas com sucesso.',
      data: response
    };
  }

  @Get(':respostaId')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('respostaId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<RespostaResponseDto>> {
    const response = await this.respostasService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Resposta buscada com sucesso.',
      data: response
    };
  }

  @Patch(':respostaId')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('respostaId', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdateRespostaDto
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Resposta atualizada com sucesso.',
      data: response
    };
  }

  @Delete(':respostaId')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('respostaId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Resposta>> {
    const response = await this.respostasService.remove(id, req.user.instituicaoId);
    return {
      message: `Resposta deletada com sucesso.`,
      data: response
    };
  }
}
