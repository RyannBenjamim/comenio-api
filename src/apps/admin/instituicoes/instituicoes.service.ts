import { PrismaService } from './../../../common/database/prisma.service';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateInstituicaoDto } from './dto/create-instituicao.dto';
import { UpdateInstituicaoDto } from './dto/update-instituicao.dto';
import { InstituicoesRepository } from './instituicoes.repository';
import { Instituicao } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InstituicoesService {
  constructor(
    private readonly instituicoesRepository: InstituicoesRepository,
    private readonly prisma: PrismaService
  ) {}

  async create(createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
    const existingCnpj = await this.instituicoesRepository.findOne({ where: { cnpj: createInstituicaoDto.cnpj } });
    if (existingCnpj) throw new ConflictException('Esse cnpj já foi cadastrado.');

    const existingEmail = await this.instituicoesRepository.findOne({ where: { email: createInstituicaoDto.email } });
    if (existingEmail) throw new ConflictException('Esse email já foi cadastrado a uma instituição.');

    const senhaHash = await bcrypt.hash("admin@12345", 10);

    const createdInstitution = await this.prisma.$transaction(async (tx) => {
      const instituicao = await tx.instituicao.create({ data: createInstituicaoDto });

      await tx.usuario.create({
        data: {
          primeiroNome: instituicao.nome,
          sobrenome: '',
          email: instituicao.email,
          senha: senhaHash,
          dataNascimento: new Date(),
          telefone: instituicao.telefone,
          cargo: 'ADMIN',
          instituicaoId: instituicao.id,
        },
      });

      return instituicao;
    });

    return createdInstitution;
  }

  async findAll(): Promise<Instituicao[]> {
    const institutions = await this.instituicoesRepository.findAll();
    return institutions;
  }

  async findOne(id: string): Promise<Instituicao> {
    const existingInstitution = await this.instituicoesRepository.findOne({ where: { id } });
    if (!existingInstitution) throw new NotFoundException('Instituição não encontrada.');
    return existingInstitution;
  }

  async update(id: string, updateInstituicaoDto: UpdateInstituicaoDto): Promise<Instituicao> {
    const existingInstitution = await this.instituicoesRepository.findOne({ where: { id } });
    if (!existingInstitution) throw new NotFoundException('Instituição não encontrada.');
    
    const updatedInstitution = await this.instituicoesRepository.update({
      where: { id },
      data: updateInstituicaoDto
    });
    return updatedInstitution;
  }

  async remove(id: string): Promise<Instituicao> {
    const existingInstitution = await this.instituicoesRepository.findOne({ where: { id } });
    if (!existingInstitution) throw new NotFoundException('Instituição não encontrada.');
    const deletedInstitution = await this.instituicoesRepository.delete({ where: { id } });
    return deletedInstitution;
  }
}
