import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import { ForbiddenException } from 'src/exception/service-exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private currentUserProvider: CurrentUserProvider,
  ) {}

  private get userId(): string {
    return this.currentUserProvider.user.userId;
  }

  private async authorize(id: string): Promise<void> {
    await this.findOne(id);
  }

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
        project: {
          userId: this.userId,
        },
      },
    });
  }

  async findOne(id: string): Promise<Session> {
    const sessionWithProject = await this.prisma.session.findUnique({
      where: {
        id: id,
      },
      include: {
        project: true,
      },
    });

    if (sessionWithProject.project.userId != this.userId) {
      throw new ForbiddenException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { project, ...session } = sessionWithProject;
    return session;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto): Promise<void> {
    await this.authorize(id);

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
    await this.authorize(id);

    await this.prisma.session.delete({
      where: { id: id },
    });
  }
}
