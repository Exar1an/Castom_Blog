import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { User } from '../users/users.model';
import { Post } from './posts.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { Blog } from '../blogs/blogs.model';
import { BlogsModule } from '../blogs/blogs.module';
import { PostsResolver } from './posts.resolver';

@Module({
    providers: [PostService, PostsResolver],
    controllers: [PostController],
    imports: [
        SequelizeModule.forFeature([User, Post, Blog]),
        FilesModule,
        forwardRef(() => BlogsModule),
        forwardRef(() => AuthModule),
    ],
    exports: [
        PostService
    ]
})
export class PostModule {}
