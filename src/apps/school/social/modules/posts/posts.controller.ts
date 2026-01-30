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
import { ValidateUUIDPipe } from '../../../../../common/pipes/ValideUUIDPipe';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import type { ApiResponse } from '../../../../../common/interfaces/ApiResponse';
import type { AuthenticatedRequest } from '../../../../../common/interfaces/AuthenticatedRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContextAccessGuard } from '../../../../../common/guards/context-access.guard';
import { ImageFilePipe } from '../../../../../common/pipes/ImageFilePipe';
import { SocialContextResolverGuard } from '../../guards/social-context-resolver.guard';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @PostMethod()
  @UseInterceptors(FileInterceptor('foto'))
  async create(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createDto: CreatePostDto,
    @UploadedFile(ImageFilePipe()) file?: Express.Multer.File
  ): Promise<ApiResponse<Post>> {
    const user = req.user;
    const { id: userId, instituicaoId } = user;

    const post = await this.postsService.create(
      userId,
      createDto,
      instituicaoId,
      user,
      file,
    );

    return {
      message: 'Post criado com sucesso.',
      data: post,
    };
  }

  @Get()
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query('comunidadeId', ValidateUUIDPipe) comunidadeId?: string,
    @Query('feedId', ValidateUUIDPipe) feedId?: string,
  ): Promise<ApiResponse<Post[]>> {
    const response = await this.postsService.findAll(
      req.user.instituicaoId,
      comunidadeId,
      feedId
    );

    return {
      message: 'Posts listados com sucesso.',
      data: response
    };
  }

  @Get('merged')
  async findAllMergedPosts(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Post[]>> {
    const user = req.user;
    const { instituicaoId } = user;
    const response = await this.postsService.findAllMergedPosts(instituicaoId, user);

    return {
      message: 'Posts listados com sucesso.',
      data: response
    };
  }

  @Get('me/photos')
  async findUserPostsForGrid(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Pick<Post, 'id' | 'fotoUrl'>[]>> {
    const { id, instituicaoId } = req.user;

    const response = await this.postsService.findUserPostsForGrid(
      instituicaoId, 
      id
    );

    return {
      message: 'Grid de posts do meu perfil listado com sucesso.',
      data: response
    };
  }

  @Get('me')
  async findUserPostsForFeed(
    @Request() req: AuthenticatedRequest,
  ): Promise<ApiResponse<Post[]>> {
    const { id, instituicaoId } = req.user;
    const response = await this.postsService.findUserPostsForFeed(
      instituicaoId,
      id
    );

    return {
      message: 'Posts do meu perfil listados com sucesso.',
      data: response
    };
  }

  @Get('users/:userId')
  async findUserProfilePostsForFeed(
    @Request() req: AuthenticatedRequest,
    @Param('userId') profileUserId: string,
  ): Promise<ApiResponse<Post[]>> {
    const { id: viewerId, instituicaoId } = req.user;

    const response = await this.postsService.findUserProfilePostsForFeed(
      instituicaoId,
      viewerId,
      profileUserId
    );

    return {
      message: 'Posts do perfil listados com sucesso.',
      data: response
    };
  }

  @Get('users/:userId/photos')
  async findUserProfilePostsForGrid(
    @Request() req: AuthenticatedRequest,
    @Param('userId') profileUserId: string,
  ): Promise<ApiResponse<Pick<Post, 'id' | 'fotoUrl'>[]>> {
    const { id: viewerId, instituicaoId } = req.user;

    const response = await this.postsService.findUserProfilePostsForGrid(
      instituicaoId,
      viewerId,
      profileUserId
    );

    return {
      message: 'Grid de posts do perfil listado com sucesso.',
      data: response
    };
  }

  @Get(':postId')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async findOne(
    @Request() req: AuthenticatedRequest,
    @Param('postId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.findOne(
      id,
      req.user.instituicaoId
    );

    return {
      message: 'Post buscado com sucesso.',
      data: response
    };
  }

  @Patch(':postId')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async update(
    @Request() req: AuthenticatedRequest,
    @Param('postId', ValidateUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateDto: UpdatePostDto
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.update(
      id,
      updateDto,
      req.user.instituicaoId
    );

    return {
      message: 'Post atualizado com sucesso.',
      data: response
    };
  }

  @Delete(':postId')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async remove(
    @Request() req: AuthenticatedRequest,
    @Param('postId', ValidateUUIDPipe) id: string
  ): Promise<ApiResponse<Post>> {
    const response = await this.postsService.remove(
      id,
      req.user.instituicaoId
    );

    return {
      message: 'Post deletado com sucesso.',
      data: response
    };
  }
}
