import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { Post } from '../posts/posts.model';
import { Blog } from '../blogs/blogs.model';
import { UsersResolver } from './user.resolver';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post, Blog]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule { }
