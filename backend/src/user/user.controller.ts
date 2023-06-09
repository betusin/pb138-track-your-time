import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { api_desc_field_invalid } from '../common-api-messages';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Creates a new user account' })
  @ApiCreatedResponse({ description: 'The user was created' })
  @ApiBadRequestResponse({ description: api_desc_field_invalid })
  @ApiConflictResponse({ description: 'A user with this email already exists' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }
}
