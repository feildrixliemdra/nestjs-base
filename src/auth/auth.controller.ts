import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginDTO })
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
