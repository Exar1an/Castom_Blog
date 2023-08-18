import { Injectable, HttpException, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blogs.model';
import { FilesService } from '../files/files.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Post } from '../posts/posts.model';
import { UpdateBlogInput } from './dtoQL/input/update-blog';
import { RolesValue } from '../posts/posts.service';

@Injectable()
export class BlogsService {
    constructor(@InjectModel(Blog) private blogsRepository: typeof Blog) { }

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

    async getUserBlogsByUserId(id: number) {
        const blogs = await this.blogsRepository.findAll({
            where: {
                userId: id
            }
        })
        if(blogs.length === 0) {
            throw new NotFoundException(`User has no blogs`)
        }
        return blogs
    }

    async updateBlog(id: number, dto: UpdateBlogInput, userId: number, roles: RolesValue) {
        const blogToUpdate = await this.blogsRepository.findByPk(id);
        if (!blogToUpdate) {
          throw new NotFoundException(`Post with id ${id} not found`);
        }
      
        if(!roles.includes('Moderator') && blogToUpdate.userId !== userId) {
          throw new ForbiddenException(`You don't have permission to update this post`);
        }
        const updatedFields: any = {};
      
        if (dto.title) {
          updatedFields.title = dto.title;
        }
        if (dto.content) {
          updatedFields.content = dto.content;
        }
      
        await blogToUpdate.update(updatedFields);
      
        return blogToUpdate;
    }

    async deleteBlog(id: number, userId: number, roles: RolesValue) {
        const blogToDelete = await this.blogsRepository.findByPk(id);
  
        if (!blogToDelete) {
          throw new NotFoundException(`Blog with id ${id} not found`);
        }
  
        if(blogToDelete.userId !== userId && !roles.includes('Moderator')) {
          throw new ForbiddenException(`You don't have permission to delete this blog`);
        }
  
        await blogToDelete.destroy()
        return new HttpException('Deleted', HttpStatus.ACCEPTED)
      }
}
