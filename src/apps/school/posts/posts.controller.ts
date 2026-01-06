import { ContextResolverGuard } from './guards/context-resolver.guard'
import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post as PostMethod, 
  Query, 
  ValidationPipe,
  Request,
  UploadedFile,
  UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { ValidateUUIDPipe } from '../../../common/pipes/ValideUUIDPipe';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import type { ApiResponse } from '../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../common/interfaces/AuthenticatedRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContextAccessGuard } from './guards/context-access.guard';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @PostMethod()
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  @UseInterceptors(FileInterceptor('foto'))
  async create(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) createDto: CreatePostDto,
  ): Promise<ApiResponse<Post>> {
    const post = await this.postsService.create(
      createDto,
      req.user.instituicaoId,
      file,
    );

    return {
      message: 'Post criado com sucesso.',
      data: post,
    };
  }

  @Get()
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('comunidadeId', ValidateUUIDPipe) comunidadeId?: string,
    @Query('feedId', ValidateUUIDPipe) feedId?: string,
  ): Promise<ApiResponse<Post[]>> {
    const response = await this.postsService.findAll(req.user.instituicaoId, comunidadeId, feedId);
    return {
      message: 'Posts listados com sucesso.',
      data: response
    };
  }

  @Get(':postId')
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('postId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.findOne(id, req.user.instituicaoId);
    return {
      message: 'Post buscado com sucesso.',
      data: response
    };
  }

  @Patch(':postId')
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('postId', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdatePostDto
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.update(id, updateDto, req.user.instituicaoId);
    return {
      message: 'Post atualizado com sucesso.',
      data: response
    };
  }

  @Delete(':postId')
  @UseGuards(ContextResolverGuard, ContextAccessGuard)
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('postId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.remove(id, req.user.instituicaoId);
    return {
      message: `Post ${response.titulo} deletado com sucesso.`,
      data: response
    };
  }
}
