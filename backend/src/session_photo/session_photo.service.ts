import { Injectable } from '@nestjs/common';
import { GetSessionPhotoDto } from './dto/get-session_photo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionPhotoDto } from './dto/create-session_photo.dto';
import { UpdateSessionPhotoDto } from './dto/update-session.dto';
import { CurrentUserProvider } from 'src/current-user/current-user.provider';
import {
  ForbiddenException,
  NotFoundException,
} from 'src/exception/service-exception';
import { SessionPhoto } from '@prisma/client';

@Injectable()
export class SessionPhotoService {
  constructor(
    private prisma: PrismaService,
    private currentUserProvider: CurrentUserProvider,
  ) {}

  private get userId(): string {
    return this.currentUserProvider.user.userId;
  }

  private async authorize(id: string): Promise<SessionPhoto> {
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

    if (!sessionPhotoWithProject) {
      throw new NotFoundException('Project not found');
    }

    if (sessionPhotoWithProject.session.project.userId != this.userId) {
      throw new ForbiddenException('');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { session, ...sessionPhoto } = sessionPhotoWithProject;
    return sessionPhoto;
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

  async findOne(id: string): Promise<GetSessionPhotoDto | null> {
    return this.authorize(id);
  }

  async update(
    id: string,
    updateSessionPhotoDto: UpdateSessionPhotoDto,
  ): Promise<void> {
    this.authorize(id);

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
    this.authorize(id);

    await this.prisma.sessionPhoto.delete({
      where: { id: id },
    });
  }
}
