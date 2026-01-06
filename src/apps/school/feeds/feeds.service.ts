import { Injectable, NotFoundException } from '@nestjs/common';
import { FeedsRepository } from './feeds.repository';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { Feed } from '@prisma/client';

@Injectable()
export class FeedsService {
  constructor(private readonly feedsRepository: FeedsRepository) {}

  async create(createFeedDto: CreateFeedDto, instituicaoId: string): Promise<Feed> {
    const createdFeed = await this.feedsRepository.create({
      data: {
        titulo: createFeedDto.titulo,
        tipoPerfil: createFeedDto.tipoPerfil,
        instituicaoId
      }
    });
    return createdFeed;
  }

  async findAll(instituicaoId: string): Promise<Feed[]> {
    const feeds = await this.feedsRepository.findAll({ where: { instituicaoId } });
    return feeds;
  }

  async findOne(id: string, instituicaoId: string): Promise<Feed> {
    const existingFeed = await this.feedsRepository.findOne({ where: { id, instituicaoId } });
    if (!existingFeed) throw new NotFoundException('Feed não encontrado.');
    return existingFeed;
  }

  async update(id: string, updateFeedDto: UpdateFeedDto, instituicaoId: string): Promise<Feed> {
    const existingFeed = await this.feedsRepository.findOne({ where: { id, instituicaoId } });
    if (!existingFeed) throw new NotFoundException('Feed não encontrado.');

    const updatedFeed = await this.feedsRepository.update({
      where: { id },
      data: updateFeedDto
    });
    return updatedFeed;
  }

  async remove(id: string, instituicaoId: string): Promise<Feed> {
    const existingFeed = await this.feedsRepository.findOne({ where: { id, instituicaoId } });
    if (!existingFeed) throw new NotFoundException('Feed não encontrado.');

    const deletedFeed = await this.feedsRepository.delete({ where: { id } });
    return deletedFeed;
  }
}
