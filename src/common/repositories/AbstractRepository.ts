import { PrismaClient, Prisma } from '@prisma/client';

export abstract class AbstractRepository<T> {
  constructor(protected readonly prisma: PrismaClient) {}

  abstract get model(): any; 

  async findAll(args?: Prisma.SelectSubset<any, any>): Promise<T[]> {
    return this.model.findMany(args);
  }

  async findOne(where: any): Promise<T | null> {
    return this.model.findUnique({ where });
  }

  async create(data: any): Promise<T> {
    return this.model.create({ data });
  }

  async update(where: any, data: any): Promise<T> {
    return this.model.update({ where, data });
  }

  async delete(where: any): Promise<T> {
    return this.model.delete({ where });
  }
}