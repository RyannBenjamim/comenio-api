import { UsuariosService } from './../../usuarios.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ProfessoresRepository } from './professores.repository';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Professor } from '@prisma/client';

@Injectable()
export class ProfessoresService {
  constructor(
    private readonly professoresRepository: ProfessoresRepository,
    private readonly usuariosService: UsuariosService,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
    // Verifa se o usuário existe
    await this.usuariosService.findOne(createProfessorDto.userId);

    const existingProfessor = await this.professoresRepository.findOne({ userId: createProfessorDto.userId });
    if (existingProfessor) throw new ConflictException('Professor já cadastrado para esse usuário.')
    
    const createdProfessor = await this.professoresRepository.create(createProfessorDto);
    return createdProfessor
  }

  async update(id: string, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
    const existingProfessor = await this.professoresRepository.findOne({ userId: id });
    if (!existingProfessor) throw new NotFoundException('Professor não encontrado.');
    const updatedProfessor = await this.professoresRepository.update({ userId: id }, updateProfessorDto);
    return updatedProfessor;
  }
}