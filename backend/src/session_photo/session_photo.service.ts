import { Injectable } from '@nestjs/common';
import { GetSessionPhotoDto } from './dto/get-session_photo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionPhotoDto } from './dto/create-session_photo.dto';
import { UpdateSessionPhotoDto } from './dto/update-session.dto';

@Injectable()
export class SessionPhotoService {
  constructor(private prisma: PrismaService) {}

  async create(
    sessionId: string,
    createSessionPhotoDto: CreateSessionPhotoDto,
    contents: string,
  ): Promise<void> {
    await this.prisma.sessionPhoto.create({
      data: {
        session: {
          connect: {
            id: sessionId,
          },
        },
        ...createSessionPhotoDto,
        contents: contents,
      },
    });
  }

  async findOne(id: string): Promise<GetSessionPhotoDto | null> {
    return await this.prisma.sessionPhoto.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateSessionPhotoDto: UpdateSessionPhotoDto,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateSessionPhotoDto,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.sessionPhoto.delete({
      where: { id: id },
    });
  }
}
