import { Injectable, HttpException, HttpStatus, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from 'src/files/files.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Role } from 'src/roles/roles.model';

export type RolesValue = string[]

@Injectable()
export class PostService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService) { }


    async create(dto: CreatePostDto, image: any, userId: number) {
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({ ...dto, image: fileName, userId })
        return post
    }

    async update(id: number, dto: UpdatePostDto, userId: number, roles: RolesValue) {

        const postToUpdate = await this.postRepository.findByPk(id);
        if (!postToUpdate) {
          throw new NotFoundException(`Post with id ${id} not found`);
        }
      
        if(!roles.includes('Moderator') && postToUpdate.userId !== userId) {
          throw new ForbiddenException(`You don't have permission to update this post`);
        }

        const updatedFields: any = {};
      
        if (dto.title) {
          updatedFields.title = dto.title;
        }
        if (dto.content) {
          updatedFields.content = dto.content;
        }
      
        await postToUpdate.update(updatedFields);
      
        return postToUpdate;
      }

    async updateImage(id: number, image: any, userId: number, roles: RolesValue) {
      const postToUpdateImage = await this.postRepository.findByPk(id);

      if (!postToUpdateImage) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      if(postToUpdateImage.userId !== userId && !roles.includes('Moderator')) {
        throw new ForbiddenException(`You don't have permission to update this post`);
      }
      const fileName = await this.fileService.createFile(image);

      await postToUpdateImage.update({image: fileName})
      return postToUpdateImage
    }
    
    async delete(id: number, userId: number, roles: RolesValue) {
      const postToDelete = await this.postRepository.findByPk(id);

      if (!postToDelete) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      if(postToDelete.userId !== userId && !roles.includes('Moderator')) {
        throw new ForbiddenException(`You don't have permission to delete this post`);
      }

      await postToDelete.destroy()
      return new HttpException('Deleted', HttpStatus.ACCEPTED)
    }
}
