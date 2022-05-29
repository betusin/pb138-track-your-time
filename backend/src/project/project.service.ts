import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createProjectDto: CreateProjectDto,
  ): Promise<void> {
    const { ...rest } = createProjectDto;

    await this.prisma.project.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...rest,
      },
    });
  }

  async findAllForUser(userId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        userId: userId,
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
    // `This action removes a #${id} project` TODO
    console.log('Deleting project ' + id);
  }
}
