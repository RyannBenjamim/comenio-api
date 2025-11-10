import { PostsService } from '../../posts.service';
import { UsuariosService } from './../../../usuarios/usuarios.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RespostasRepository } from './respostas.repository';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { UpdateRespostaDto } from './dto/update-resposta.dto';
import { Resposta } from '@prisma/client';

@Injectable()
export class RespostasService {
  constructor(
    private readonly respostasRepository: RespostasRepository,
    private readonly usuariosService: UsuariosService,
    private readonly postsService: PostsService
  ) {}

  async create(createRespostaDto: CreateRespostaDto): Promise<Resposta> {
    const { userId, postId, respostaId } = createRespostaDto;

    // Verifica se o usuário existe
    await this.usuariosService.findOne(userId);

    if (!postId && !respostaId) {
      throw new BadRequestException('Resposta deve estar vinculada a um post ou resposta.');
    }
    
    if (postId && respostaId) {
      throw new BadRequestException('Resposta deve ter só um vínculo: post ou resposta.');
    }
    
    if (postId) this.postsService.findOne(postId);
    if (respostaId) await this.findOne(respostaId);
    
    const createdResposta = await this.respostasRepository.create({ data: createRespostaDto });
    return createdResposta;
  }

  async findAll(postId?: string, respostaId?: string): Promise<Resposta[]> {
    if (!postId && !respostaId) {
      throw new BadRequestException('Pelo menos um parâmetro de query deve ser enviado.');
    }

    if (postId && respostaId) {
      throw new BadRequestException('Apenas um parâmetro de query pode ser usado por vez.');
    }

    const args = postId ? { where: { postId } } : { where: { respostaId } };

    const list = await this.respostasRepository.findAll(args);
    return list;
  }

  async findOne(id: string): Promise<Resposta> {
    const existingResposta = await this.respostasRepository.findOne({ where: { id } });
    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');
    return existingResposta;
  }

  async update(id: string, updateRespostaDto: UpdateRespostaDto): Promise<Resposta> {
    const existingResposta = await this.respostasRepository.findOne({ where: { id } });
    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');

    const updated = await this.respostasRepository.update({
      where: { id },
      data: updateRespostaDto
    });
    return updated;
  }

  async remove(id: string): Promise<Resposta> {
    const existingResposta = await this.respostasRepository.findOne({ where: { id } });
    if (!existingResposta) throw new NotFoundException('Resposta não encontrada.');

    const deletedResposta = await this.respostasRepository.delete({ where: { id } });
    return deletedResposta;
  }
}
