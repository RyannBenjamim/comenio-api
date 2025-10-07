import { UsuariosService } from './../../usuarios.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { ProfessoresRepository } from './professores.repository';
import { ConflictException, Injectable } from "@nestjs/common";
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
}