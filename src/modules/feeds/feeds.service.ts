import { Injectable, NotFoundException } from '@nestjs/common';
import { FeedsRepository } from './feeds.repository';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { Feed } from '@prisma/client';

@Injectable()
export class FeedsService {
  constructor(private readonly feedsRepository: FeedsRepository) {}

  async create(createFeedDto: CreateFeedDto): Promise<Feed> {
    const createdFeed = await this.feedsRepository.create({ data: createFeedDto });
    return createdFeed;
  }

  async findAll(): Promise<Feed[]> {
    const feeds = await this.feedsRepository.findAll();
    return feeds;
  }

  async findOne(id: string): Promise<Feed> {
    const existingFeed = await this.feedsRepository.findOne({ where: { id } });
    if (!existingFeed) throw new NotFoundException('Feed não encontrado.');
    return existingFeed;
  }

  async update(id: string, updateFeedDto: UpdateFeedDto): Promise<Feed> {
    const existingFeed = await this.feedsRepository.findOne({ where: { id } });
    if (!existingFeed) throw new NotFoundException('Feed não encontrado.');

    const updatedFeed = await this.feedsRepository.update({
      where: { id },
      data: updateFeedDto
    });
    return updatedFeed;
  }

  async remove(id: string): Promise<Feed> {
    const existingFeed = await this.feedsRepository.findOne({ where: { id } });
    if (!existingFeed) throw new NotFoundException('Feed não encontrado.');

    const deletedFeed = await this.feedsRepository.delete({ where: { id } });
    return deletedFeed;
  }
}
