import { Body, Controller, Post, UploadedFile, UseInterceptors, Patch, Param, Delete } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';


@ApiTags('Posts')
@Controller()
export class PostController {

    constructor(private postService: PostService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async createPost(@Body() dto: CreatePostDto,
        @Res() res: Response,
        @Param('blogId') blogId: number,
        @UploadedFile() image) {
        const { userId } = res.locals
        const response = await this.postService.create(dto, image, userId, blogId)
        res.send(response)
    }

//TODO must be get controller

    @Patch('/:id')
    @UseGuards(JwtAuthGuard)
    async updatePost(
        @Param('id') id: number,
        @Body() dto: UpdatePostDto,
        @Res() res: Response
    ) {
        const { userId } = res.locals
        const { roles } = res.locals
        const response = await this.postService.update(id, dto, userId, roles);
        res.send(response);
    }

    @Patch('/:id/image')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    updatePostImage(
        @Param('id') id: number,
        @UploadedFile() image: any,
        @Res() res: Response
    ) {
        const { userId } = res.locals
        const { roles } = res.locals
        const response =  this.postService.updateImage(id, image, userId, roles);
        res.send(response)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number, @Res() res: Response) {
        const {userId} = res.locals
        const { roles } = res.locals
        const response = await this.postService.delete(id, userId, roles)
        res.send(response)
    }
}
