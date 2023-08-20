import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blogs')
@Controller()
export class BlogsController { 

    constructor(private blogsService: BlogsService) { }

    @Get()
    getAllBlogs(){
        return this.blogsService.get()
    }

    @Get('/:id')
    getBlogById(@Param('id') id: number) {
        return this.blogsService.getBlogById(id)
    }

    @Get('/:id/list')
    async getPostsByBlogId(@Param('id') id: number) {
        const blog =  await this.blogsService.getBlogById(id)
        return blog.posts
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() dto: CreateBlogDto,
        @Res() res: Response) {
        const { userId } = res.locals
        const response = await this.blogsService.create(dto, userId)
        res.send(response)
    }


    @Post('/:id')
    @UseGuards(JwtAuthGuard)
    async updatePost(@Body() dto: UpdateBlogDto, @Param('id') id: number, @Res() res: Response) {
        const { userId, roles } = res.locals
        const response = await this.blogsService.updateBlog(id, dto, userId, roles)
        res.send(response)
    }
}


