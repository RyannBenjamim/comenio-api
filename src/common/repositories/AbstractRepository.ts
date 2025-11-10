import { PrismaClient } from '@prisma/client';

export abstract class AbstractRepository<
  TModel,
  TDelegate extends {
    findMany: (args?: any) => Promise<TModel[]>;
    findUnique: (args: any) => Promise<TModel | null>;
    create: (args: any) => Promise<TModel>;
    update: (args: any) => Promise<TModel>;
    delete: (args: any) => Promise<TModel>;
    count: (args: any) => Promise<number>;
  }
> {
  constructor(protected readonly prisma: PrismaClient) {}

  abstract get model(): TDelegate;

  async findAll(
    args?: Parameters<TDelegate['findMany']>[0]
  ): Promise<TModel[]> {
    return this.model.findMany(args);
  }

  async findOne(
    args: Parameters<TDelegate['findUnique']>[0]
  ): Promise<TModel | null> {
    return this.model.findUnique(args);
  }

  async create(
    args: Parameters<TDelegate['create']>[0]
  ): Promise<TModel> {
    return this.model.create(args);
  }

  async update(
    args: Parameters<TDelegate['update']>[0]
  ): Promise<TModel> {
    return this.model.update(args);
  }

  async delete(
    args: Parameters<TDelegate['delete']>[0]
  ): Promise<TModel> {
    return this.model.delete(args);
  }

  async count(
    args: Parameters<TDelegate['count']>[0]
  ): Promise<number> {
    return this.model.count(args);
  }
}
