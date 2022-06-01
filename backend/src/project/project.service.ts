import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUserProvider } from 'src/current-user.provider';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  private get userId(): string {
    return this.currentUserProvider.user.userId;
  }

  constructor(
    private prisma: PrismaService,
    private currentUserProvider: CurrentUserProvider,
  ) {}

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

  async findAllForUser(): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId: this.userId,
      },
    });
  }

  async findOne(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<void> {
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
    await this.prisma.project.delete({
      where: { id: id },
    });
  }
}
