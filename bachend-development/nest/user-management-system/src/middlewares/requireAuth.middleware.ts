import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RequireAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }

    try {
      const payload = jwt.verify(token, jwtSecret);
      req['user'] = payload;
      next();
    } catch (error) {
      console.log('error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
