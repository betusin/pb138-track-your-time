import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, createSessionDto: CreateSessionDto) {
    return this.prisma.session.create({
      data: {
        project: {
          connect: {
            id: projectId,
          },
        },
        ...createSessionDto,
      },
    });
  }

  async findAll(projectId: string): Promise<Session[]> {
    return this.prisma.session.findMany({
      where: {
        projectId: projectId,
      },
    });
  }

  async findOne(id: string, projectId: string): Promise<Session | null> {
    const session = await this.prisma.session.findUnique({
      where: {
        id: id,
      },
    });

    if (session.projectId != projectId) {
      return null;
    }
  }

  async update(
    id: string,
    projectId: string,
    updateSessionDto: UpdateSessionDto,
  ) {
    const session = await this.prisma.session.findUnique({
      where: {
        id: id,
      },
    });

    if (session.projectId != projectId) {
      return;
    }

    return this.prisma.session.update({
      where: {
        id: id,
      },
      data: {
        ...updateSessionDto,
      },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
