import { UsuariosService } from './../../usuarios.service';
import { CreateModeradorDto } from './dto/create-moderador.dto';
import { UpdateModeradorDto } from './dto/update-moderador.dto';
import { ModeradoresRepository } from './moderadores.repository';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Moderador } from '@prisma/client';

@Injectable()
export class ModeradoresService {
  constructor(
    private readonly moderadoresRepository: ModeradoresRepository,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createModeradorDto: CreateModeradorDto): Promise<Moderador> {
    // Verifica se o usuário existe
    await this.usuariosService.findOne(createModeradorDto.userId);

    const existingModerador = await this.moderadoresRepository.findOne({ userId: createModeradorDto.userId });
    if (existingModerador) throw new ConflictException('Moderador já cadastrado para esse usuário.');

    const createdModerador = await this.moderadoresRepository.create(createModeradorDto);
    return createdModerador;
  }

  async update(id: string, updateModeradorDto: UpdateModeradorDto): Promise<Moderador> {
    const existingModerador = await this.moderadoresRepository.findOne({ userId: id });
    if (!existingModerador) throw new NotFoundException('Moderador não encontrado.');
    const updatedModerador = await this.moderadoresRepository.update({ userId: id }, updateModeradorDto);
    return updatedModerador;
  }
}
