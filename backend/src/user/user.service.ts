import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../auth/password-hashing';
import { User } from '@prisma/client';
import { GetUserDto } from './dto/get-user-dto.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const passwordHash = await hashPassword(createUserDto.password);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...things } = createUserDto;
    await this.prisma.user.create({
      data: {
        ...things,
        passwordHash: passwordHash,
      },
    });
  }

  async findOne(id: string): Promise<GetUserDto | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      // Delete user
      await prisma.user.delete({
        where: { id: id },
      });
      // Delete projects
      const projectIds = await prisma.project.findMany({
        where: { userId: id },
        select: { id: true },
      });
      await prisma.project.deleteMany({
        where: { id: { in: projectIds.map((a) => a.id) } },
      });
      // Delete sessions
      const sessionIds = await prisma.session.findMany({
        where: { projectId: { in: projectIds.map((a) => a.id) } },
        select: { id: true },
      });
      await prisma.session.deleteMany({
        where: { projectId: { in: projectIds.map((a) => a.id) } },
      });
      // Delete session photos
      await prisma.sessionPhoto.deleteMany({
        where: { sessionId: { in: sessionIds.map((a) => a.id) } },
      });
    });
  }
}
