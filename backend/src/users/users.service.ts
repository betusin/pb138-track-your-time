import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  async findUser(username: string): Promise<User | undefined> {
    return {
      id: '0',
      email: 'jano@email.com',
      username: 'Jano',
      password: 'ahoj',
    };
  }
}
