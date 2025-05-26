import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, Max, Min } from 'class-validator';
import { UserRole } from 'src/schemas/user.schema';

export class BaseAuthDto {
  @ApiProperty({
    example: 'test@tst.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends BaseAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(16)
  @Max(60)
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^01\d{9}$/, {
    message: 'mobile number must be 11 digits starting with 01',
  })
  mobileNumber: string;

  @ApiProperty({
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;
}

export class SignInDto extends BaseAuthDto {}
