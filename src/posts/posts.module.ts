import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { User } from '../users/users.model';
import { Post } from './posts.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from '../files/files.module';

@Module({
    providers: [PostService],
    controllers: [PostController],
    imports: [
        SequelizeModule.forFeature([User, Post]),
        FilesModule
    ]
})
export class PostModule {}
