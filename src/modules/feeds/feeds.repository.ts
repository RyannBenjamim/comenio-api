import { Injectable } from "@nestjs/common";
import { Feed } from "@prisma/client";
import { AbstractRepository } from "../../common/repositories/AbstractRepository";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class FeedsRepository extends AbstractRepository<Feed> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.feed;
  }
}
