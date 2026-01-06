import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/database/prisma.service';
import { Superadmin, PrismaClient } from '@prisma/client';
import { AbstractRepository } from '../../../common/repositories/AbstractRepository';

@Injectable()
export class SuperadminRepository extends AbstractRepository<Superadmin, PrismaClient['superadmin']> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.superadmin;
  }

  async findByEmail(email: string): Promise<Superadmin | null> {
    return this.model.findUnique({
      where: { email },
    });
  }
}

