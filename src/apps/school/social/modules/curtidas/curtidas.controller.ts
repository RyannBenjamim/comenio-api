import { Body, Controller, Get, Post, Query, ValidationPipe, Request, UseGuards } from "@nestjs/common";
import { CurtidaDto } from './dto/curtida.dto';
import { CurtidasService } from './curtidas.service';
import { ApiResponse } from "../../../../../common/interfaces/ApiResponse";
import { Curtida } from "@prisma/client";
import { ValidateUUIDPipe } from "../../../../../common/pipes/ValideUUIDPipe";
import type { AuthenticatedRequest } from "../../../../../common/interfaces/AuthenticatedRequest";
import { SocialContextResolverGuard } from '../../guards/social-context-resolver.guard';
import { ContextAccessGuard } from '../../../../../common/guards/context-access.guard';

@Controller('api/curtidas')
export class CurtidasController {
  constructor(private readonly curtidasService: CurtidasService) {}

  @Post('like')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async like(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) createCurtidaDto: CurtidaDto
  ): Promise<ApiResponse> {
    await this.curtidasService.like(createCurtidaDto, req.user.instituicaoId);
    return { message: 'Curtida registrada com sucesso.' }
  }

  
  @Post('unlike')
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async unlike(
    @Request() req: AuthenticatedRequest,
    @Body(new ValidationPipe()) removeCurtidaDto: CurtidaDto
  ): Promise<ApiResponse> {
    await this.curtidasService.unlike(removeCurtidaDto, req.user.instituicaoId);
    return { message: 'Curtida removida com sucesso.' }
  }

  @Get()
  @UseGuards(SocialContextResolverGuard, ContextAccessGuard)
  async getLikes(
    @Request() req: AuthenticatedRequest,
    @Query('postId', ValidateUUIDPipe) postId?: string,
    @Query('respostaId', ValidateUUIDPipe) respostaId?: string,
  ): Promise<ApiResponse<{ likes: Curtida[], totalLikes: number }>> {
    const response = await this.curtidasService.getLikes(req.user.instituicaoId, postId, respostaId);
    return {
      message: 'Curtidas listadas com sucesso.',
      data: response
    }
  }
}