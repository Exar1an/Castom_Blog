import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Post } from '../posts/posts.model';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../posts/posts.module';
import { Blog } from './blogs.model';
import { FilesModule } from '../files/files.module';
import { BlogsResolver } from './blogs.resolver';


@Module({
  controllers: [BlogsController],
  providers: [BlogsService, BlogsResolver],
  imports: [
    SequelizeModule.forFeature([User, Post, Blog]),
    forwardRef(() => AuthModule),
    forwardRef(() => PostModule),
    FilesModule
],
exports: [
    BlogsService,
]
})
export class BlogsModule {}
