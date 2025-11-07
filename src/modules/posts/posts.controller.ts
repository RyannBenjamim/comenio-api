import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post as PostMethod, 
  Query, 
  ValidationPipe 
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { ValidateUUIDPipe } from '../../common/pipes/ValideUUIDPipe';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import type { ApiResponse } from '../../common/interfaces/ApiResponse';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @PostMethod()
  async create(
    @Body(new ValidationPipe()) createDto: CreatePostDto
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.create(createDto);
    return {
      message: 'Post criado com sucesso.',
      data: response
    };
  }

  @Get()
  async findAll(
    @Query('comunidadeId', ValidateUUIDPipe) comunidadeId?: string,
    @Query('feedId', ValidateUUIDPipe) feedId?: string,
  ): Promise<ApiResponse<Post[]>> {
    const response = await this.postsService.findAll(comunidadeId, feedId);
    return {
      message: 'Posts listados com sucesso.',
      data: response
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.findOne(id);
    return {
      message: 'Post buscado com sucesso.',
      data: response
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdatePostDto
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.update(id, updateDto);
    return {
      message: 'Post atualizado com sucesso.',
      data: response
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.remove(id);
    return {
      message: `Post ${response.titulo} deletado com sucesso.`,
      data: response
    };
  }
}
