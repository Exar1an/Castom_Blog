import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserRolesParam = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const roles = ctx.getContext().req.user.roles.map(({ value }) => value)
    return roles
  },
);

//guide to use @UserRolesParam() roles: []