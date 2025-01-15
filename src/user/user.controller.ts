import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDTO } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: any) {
    return req.user; // This comes from the JWT payload
  }

  @Get()
  async getAll() {
    const user = await this.userService.findAll();

    return [
      ...user.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        created_at: u.created_at,
        updated_at: u.updated_at,
      })),
    ];
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const user = await this.userService.findOne(id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDTO })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
    const user = await this.userService.update(id, updateUserDto);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
