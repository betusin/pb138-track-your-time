import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ForbiddenException } from 'src/exception/service-exception';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';

@Injectable()
export class ProjectService {
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

  async create(createProjectDto: CreateProjectDto): Promise<void> {
    const { ...rest } = createProjectDto;

    await this.prisma.project.create({
      data: {
        user: {
          connect: {
            id: this.userId,
          },
        },
        ...rest,
      },
    });
  }

  async findAllForUser(id: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId: id,
      },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (project.userId != this.userId) {
      throw new ForbiddenException();
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<void> {
    await this.authorize(id);

    await this.prisma.project.update({
      where: {
        id: id,
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.authorize(id);

    await this.prisma.project.delete({
      where: { id: id },
    });
  }
}
