import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { CurtidaDto } from './dto/curtida.dto';
import { CurtidasService } from './curtidas.service';
import { ApiResponse } from "../../../../common/interfaces/ApiResponse";
import { Curtida } from "@prisma/client";
import { ValidateUUIDPipe } from "src/common/pipes/ValideUUIDPipe";

@Controller()
export class CurtidasController {
  constructor(private readonly curtidasService: CurtidasService) {}

  @Post()
  async like(
    @Body(new ValidationPipe()) createCurtidaDto: CurtidaDto
  ): Promise<ApiResponse> {
    await this.curtidasService.like(createCurtidaDto);
    return { message: 'Curtida registrada com sucesso.' }
  }

  
  @Post()
  async unlike(
    @Body(new ValidationPipe()) removeCurtidaDto: CurtidaDto
  ): Promise<ApiResponse> {
    await this.curtidasService.unlike(removeCurtidaDto);
    return { message: 'Curtida removida com sucesso.' }
  }

  @Get()
  async getLikes(
    @Query('postId', ValidateUUIDPipe) postId?: string,
    @Query('respostaId', ValidateUUIDPipe) respostaId?: string,
  ): Promise<ApiResponse<{ likes: Curtida[], totalLikes: number }>> {
    const response = await this.curtidasService.getLikes(postId, respostaId);
    return {
      message: 'Curtidas listadas com sucesso.',
      data: response
    }
  }
}