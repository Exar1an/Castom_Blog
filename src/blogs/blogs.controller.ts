import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

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


// //TODO must be get controller

//     @Patch('/:id')
//     @UseGuards(JwtAuthGuard)
//     async updatePost(
//         @Param('id') id: number,
//         @Body() dto: UpdatePostDto,
//         @Res() res: Response
//     ) {
//         const { userId } = res.locals
//         const { roles } = res.locals
//         const response = await this.postService.update(id, dto, userId, roles);
//         res.send(response);
//     }

//     @Patch('/:id/image')
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(FileInterceptor('image'))
//     updatePostImage(
//         @Param('id') id: number,
//         @UploadedFile() image: any,
//         @Res() res: Response
//     ) {
//         const { userId } = res.locals
//         const { roles } = res.locals
//         const response =  this.postService.updateImage(id, image, userId, roles);
//         res.send(response)
//     }

//     @Delete('/:id')
//     @UseGuards(JwtAuthGuard)
//     async delete(@Param('id') id: number, @Res() res: Response) {
//         const {userId} = res.locals
//         const { roles } = res.locals
//         const response = await this.postService.delete(id, userId, roles)
//         res.send(response)
//     }
}


