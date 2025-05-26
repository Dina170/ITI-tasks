import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Role = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return user.role == data;
  },
);
