import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { RolesModule } from '../roles/roles.module';
import { PostModule } from '../posts/posts.module';
import { BlogsModule } from '../blogs/blogs.module';
import { AuthResolver } from './auth.resolver';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthResolver],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
    forwardRef(() => PostModule),
    forwardRef(() => BlogsModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    AuthResolver,
    JwtModule
  ]
})
export class AuthModule {}
