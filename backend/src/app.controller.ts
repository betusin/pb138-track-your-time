import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const prisma = new PrismaClient();

    const newUser = await prisma.user.create({
      data: {
        email: 'lukas.urbn@gmail.com',
        name: 'lukasko',
        surname: 'urbanko',
        company: 'jo',
        logo: 'google.com',
      },
    });

    const users = await prisma.user.findMany();
    console.log(users);

    return 'User was created: ' + newUser.name;
  }
}
