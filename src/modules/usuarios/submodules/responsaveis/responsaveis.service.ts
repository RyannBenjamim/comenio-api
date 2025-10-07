import { UsuariosService } from './../../usuarios.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { ResponsaveisRepository } from './responsaveis.repository';
import { ConflictException, Injectable } from "@nestjs/common";
import { Responsavel } from '@prisma/client';

@Injectable()
export class ResponsaveisService {
  constructor(
    private readonly responsaveisRepository: ResponsaveisRepository,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createResponsavelDto: CreateResponsavelDto): Promise<Responsavel> {
    // Verifica se o usuário existe
    await this.usuariosService.findOne(createResponsavelDto.userId);

    const existingResponsavel = await this.responsaveisRepository.findOne({ userId: createResponsavelDto.userId });
    if (existingResponsavel) throw new ConflictException('Responsável já cadastrado para esse usuário.');

    const createdResponsavel = await this.responsaveisRepository.create(createResponsavelDto);
    return createdResponsavel;
  }
}
