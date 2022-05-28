import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    const { userId, ...rest } = createProjectDto;

    return this.prisma.project.create({
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

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: {
        id: id,
      },
      data: {
        ...updateProjectDto,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
