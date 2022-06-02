import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../auth/password-hashing';
import { User } from '@prisma/client';
import { GetUserDto } from './dto/get-user-dto.dto';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import {
  ForbiddenException,
  NotFoundException,
} from 'src/exception/service-exception';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private currentUserProvider: CurrentUserProvider,
  ) {}

  private get userId(): string {
    return this.currentUserProvider.user.userId;
  }

  private async authorize(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id != this.userId) {
      throw new ForbiddenException('');
    }

    return user;
  }

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

  async findOne(id: string): Promise<GetUserDto> {
    return this.authorize(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.authorize(id);

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
    // `This action removes a #${id} user` TODO
    console.log('Deleting user ' + id);
  }
}
