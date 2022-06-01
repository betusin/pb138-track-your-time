import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      PrismaService.interceptForSoftDelete(params);
      return next(params);
    });
  }

  private static interceptForSoftDelete(params) {
    switch (params.action) {
      case 'delete':
        PrismaService.interceptDeleteForSoftDeletes(params);
        break;
      case 'deleteMany':
        PrismaService.interceptDeleteManyForSoftDelete(params);
        break;
      case 'update':
        PrismaService.interceptSoftDeleteUpdate(params);
        break;
      case 'updateMany':
        PrismaService.interceptSoftDeleteUpdateMany(params);
        break;
      case 'findUnique':
      case 'findFirst':
        PrismaService.interceptSoftDeleteFindUniqueFindFirst(params);
        break;
      case 'findMany':
        PrismaService.interceptSoftDeleteFindMany(params);
        break;
    }
  }

  private static interceptDeleteForSoftDeletes(params) {
    params.action = 'updateMany';
    params.args['data'] = { deleted: new Date() };
    params.args['where'] = { deleted: null };
  }

  private static interceptDeleteManyForSoftDelete(params) {
    params.action = 'updateMany';
    if (params.args.data != undefined) {
      params.args.data['deleted'] = new Date();
    } else {
      params.args['data'] = { deleted: new Date() };
    }
    params.args['where'] = { deleted: null };
  }

  private static interceptSoftDeleteUpdateMany(params) {
    if (params.args.where != undefined) {
      params.args.where['deleted'] = null;
    } else {
      params.args['where'] = { deleted: null };
    }
  }

  private static interceptSoftDeleteUpdate(params) {
    params.action = 'updateMany';
    params.args.where['deleted'] = null;
  }

  private static interceptSoftDeleteFindMany(params) {
    if (params.args.where) {
      if (params.args.where.deleted == undefined) {
        params.args.where['deleted'] = null;
      }
    } else {
      params.args['where'] = { deleted: null };
    }
  }

  private static interceptSoftDeleteFindUniqueFindFirst(params) {
    params.action = 'findFirst';
    params.args.where['deleted'] = null;
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
