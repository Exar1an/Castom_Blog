import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { UserId } from '../users/reqUserParams/userId';
import { BlogModel } from './dtoQL/blog-model';
import { BlogsService } from './blogs.service';
import { CreateBlogInput } from './dtoQL/input/create-blog';
import { UserRolesParam } from '../users/reqUserParams/userRoles';
import { UpdateBlogInput } from './dtoQL/input/update-blog';


@Resolver(() => BlogModel)
export class BlogsResolver {
    constructor(private blogsService: BlogsService) { }

    @UseGuards(JwtAuthGuard)
    @Query(() => BlogModel)
    getBlogById(@Args('id') id: number) {
        return this.blogsService.getBlogById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [BlogModel])
    getAllBlogs() {
        return this.blogsService.get()
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [BlogModel])
    getUserBlogsByUserId(@Args('id') id: number) {
        return this.blogsService.getUserBlogsByUserId(id)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => BlogModel)
    createBlog(@Args('createBlogData') createBlogData: CreateBlogInput, @UserId() userId: number) {
        return this.blogsService.create(createBlogData, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => BlogModel)
    updateBlog(@Args('id') id: number, @Args('updateBlogData') updateBlogData: UpdateBlogInput, @UserId() userId: number, @UserRolesParam() roles: []) {
        return this.blogsService.updateBlog(id, updateBlogData, userId, roles)
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async deleteBlog(@Args('id') id: number, @UserId() userId: number, @UserRolesParam() roles: []) {
        await this.blogsService.deleteBlog(id, userId, roles)
        return true
    }

}