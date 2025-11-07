import { Injectable } from "@nestjs/common";
import { PrismaClient, Post } from "@prisma/client";
import { AbstractRepository } from "../../common/repositories/AbstractRepository";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class PostsRepository extends AbstractRepository<Post, PrismaClient['post']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.post;
  }
}
