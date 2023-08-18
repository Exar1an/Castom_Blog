import { Resolver, Args, Mutation, Query, Context, Int } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { UserId } from 'src/users/reqUserParams/userId';
import { PostModel } from './dtoQL/posts-model';
import { PostService } from './posts.service';
import { CreatePostInput } from './dtoQL/input/create-post';
import { UserRolesParam } from '../users/reqUserParams/userRoles';
import { UpdateContentInput, UpdateTitleInput } from './dtoQL/input/update-post';

@Resolver(() => PostModel)
export class PostsResolver {
    constructor(private postService: PostService) { }

    @UseGuards(JwtAuthGuard)
    @Query(() => PostModel)
    getPost(@Args('id') id: number) {
        return this.postService.getPostById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [PostModel])
    getBlogPosts(@Args('id') id: number) {
        return this.postService.getBlogPosts(id)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => PostModel)
    async createPost(
        @Args('createPostData') createPostData: CreatePostInput,
        @UserId() userId: number,
        @Args('blogId') blogId: number,
    ) {
        const image = 'coming soon'
        return await this.postService.create(createPostData, image, userId, blogId);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => PostModel)
    async updatePost(
        @Args('id') id: number,
        @UserId() userId: number,
        @UserRolesParam() roles: [],
        @Args('updateTitle') updateTitle: UpdateTitleInput,
        @Args('updateContent') updateContent: UpdateContentInput,
    ) {
        const updatePostData = { title: updateTitle.title, content: updateContent.content }
        return await this.postService.update(id, updatePostData, userId, roles)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async deletePost(
        @Args('id') id: number,
        @UserId() userId: number,
        @UserRolesParam() roles: [],
    ) {
        await this.postService.delete(id, userId, roles)
        return true
    }

}