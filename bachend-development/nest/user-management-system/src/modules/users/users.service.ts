import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/dto';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    let user = await this.model.findOne({ email });

    if (user) throw new ConflictException('email already exists');

    const hashedPass = await bcrypt.hash(password, 10);

    user = await this.model.create({
      email,
      password: hashedPass,
      fullName: signUpDto.fullName,
      age: signUpDto.age,
      mobileNumber: signUpDto.mobileNumber,
      role: signUpDto.role,
    });

    return { id: user.id, email: user.email };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    let user = await this.model.findOne({ email });

    if (!user) throw new NotFoundException('email not found');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      email: user.email,
      role: user.role,
    };

    const jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

    return { email: user.email, token };
  }

  async getProfile(userEmail: string) {
    const user = await this.model.findOne({ email: userEmail });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return {
      email: user.email,
      role: user.role,
    };
  }

  getAllUsers(userEmail: string, isAdmin: boolean) {
    if (isAdmin !== true) {
      throw new UnauthorizedException('not authorized to view all users');
    }

    return this.model.find({ email: { $ne: userEmail } });
  }
}
