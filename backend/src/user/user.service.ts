import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../auth/password-hashing';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await hashPassword(createUserDto.password);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...things } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...things,
        passwordHash: passwordHash,
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
