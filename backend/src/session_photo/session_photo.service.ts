import { Injectable } from '@nestjs/common';
import { GetSessionPhotoDto } from './dto/get-session_photo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionPhotoDto } from './dto/create-session_photo.dto';
import { UpdateSessionPhotoDto } from './dto/update-session.dto';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import { ForbiddenException } from 'src/exception/service-exception';

@Injectable()
export class SessionPhotoService {
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

  async findOne(id: string): Promise<GetSessionPhotoDto> {
    const sessionPhotoWithProject = await this.prisma.sessionPhoto.findUnique({
      where: {
        id: id,
      },
      include: {
        session: {
          include: {
            project: true,
          },
        },
      },
    });

    if (sessionPhotoWithProject.session.project.userId != this.userId) {
      throw new ForbiddenException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { session, ...sessionPhoto } = sessionPhotoWithProject;
    return sessionPhoto;
  }

  async update(
    id: string,
    updateSessionPhotoDto: UpdateSessionPhotoDto,
  ): Promise<void> {
    await this.authorize(id);

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
    await this.authorize(id);

    await this.prisma.sessionPhoto.delete({
      where: { id: id },
    });
  }
}
