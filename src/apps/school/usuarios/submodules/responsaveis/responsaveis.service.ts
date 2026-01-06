import { UsuariosService } from '../../usuarios.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { ResponsaveisRepository } from './responsaveis.repository';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Responsavel } from '@prisma/client';

@Injectable()
export class ResponsaveisService {
  constructor(
    private readonly responsaveisRepository: ResponsaveisRepository,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createResponsavelDto: CreateResponsavelDto, instituicaoId: string): Promise<Responsavel> {
    // Verifica se o usuário existe
    await this.usuariosService.findOne(createResponsavelDto.userId, instituicaoId);

    const existingResponsavel = await this.responsaveisRepository.findOne({ where: {
      userId: createResponsavelDto.userId
    }});
    if (existingResponsavel) throw new ConflictException('Responsável já cadastrado para esse usuário.');

    const createdResponsavel = await this.responsaveisRepository.create({ data: createResponsavelDto });
    return createdResponsavel;
  }

  async update(id: string, updateResponsavelDto: UpdateResponsavelDto): Promise<Responsavel> {
    const existingResponsavel = await this.responsaveisRepository.findOne({ where: {
      userId: updateResponsavelDto.userId
    }});
    if (!existingResponsavel) throw new NotFoundException('Responsável não encontrado.');

    const updatedResponsavel = await this.responsaveisRepository.update({
      where: { userId: id },
      data: updateResponsavelDto
    });
    return updatedResponsavel;
  }
}
