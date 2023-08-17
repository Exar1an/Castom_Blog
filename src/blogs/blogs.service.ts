import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blogs.model';
import { FilesService } from '../files/files.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Post } from '../posts/posts.model';

@Injectable()
export class BlogsService {
    constructor(@InjectModel(Blog) private blogsRepository: typeof Blog,
        private fileService: FilesService) { }

    async get(){
        const getAllBlogs = await this.blogsRepository.findAll({
            include: [Post]
        })
        return getAllBlogs
    }

    async getBlogById(id: number) {
        const blog = await this.blogsRepository.findByPk(id, {
            include: [Post]
        })
        return blog
    }

    async create(dto: CreateBlogDto, userId: number) {
        const createBlog = await this.blogsRepository.create({ ...dto, userId })
        return createBlog
    }


}
