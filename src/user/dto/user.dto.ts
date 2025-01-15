import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @MinLength(6)
  @IsOptional()
  @ApiProperty()
  password?: string;
}
