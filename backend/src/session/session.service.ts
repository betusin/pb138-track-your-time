import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(
    projectId: string,
    createSessionDto: CreateSessionDto,
  ): Promise<void> {
    await this.prisma.session.create({
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

  async findOne(id: string): Promise<Session | null> {
    return await this.prisma.session.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<void> {
    await this.prisma.session.update({
      where: {
        id: id,
      },
      data: {
        ...updateSessionDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.prisma.$transaction(async (prisma) => {
      // Delete session
      const result = await this.prisma.session.delete({
        where: { id: id },
      });
      // Delete session photos
      await prisma.sessionPhoto.deleteMany({
        where: { sessionId: id },
      });
      return result;
    });
    // TODO Throw 404 on result.count == 0
  }
}
