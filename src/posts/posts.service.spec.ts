import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Sequelize } from 'sequelize-typescript';
import { createMemDB } from '../utils/create-memDB';
import { Post } from '../posts/posts.model';
import { Blog } from '../blogs/blogs.model';
import { timeString } from '../utils/time';
import { PostService } from './posts.service';
import { User } from '../users/users.model';
import { FilesService } from '../files/files.service';
import { BlogsService } from '../blogs/blogs.service';

describe('The PostService and BlogsService', () => {

    let blogService: BlogsService
    let postService: PostService
    let memDb: Sequelize;
    beforeAll(async () => {
        memDb = await createMemDB([User, Role, UserRoles, Post, Blog])
        postService = new PostService(Post, new FilesService(), new BlogsService(Blog))
        blogService = new BlogsService(Blog)
    });

    afterAll(async () => {
        const posts = await Post.findAll({where: { title: 'test'}})
        const blogs = await Blog.findAll({where: { title: 'test' }})

        for (const post of posts) {
            await post.destroy();
        }
    
        for (const blog of blogs) {
            await blog.destroy();
        }

        memDb.close()

    });
    describe('Testing Post and Blog', () => {
        it('should create blog and post', async () => {
            const mockBlog = { title: 'test', content: 'post' }
            const createdBlog = await blogService.create(mockBlog, 1)
            const mockPost = { title: 'test', content: 'post' }
            const image = 'coming soon'
            const createdPost = await postService.create(mockPost, image, 1, createdBlog.id)
            const blogPosts = await postService.getBlogPosts(createdBlog.id)

            expect(createdBlog).toBeDefined();
            expect(createdBlog.title).toBe(mockBlog.title);
            expect(createdBlog.content).toBe(mockBlog.content);

            expect(createdPost).toBeDefined();
            expect(createdPost.title).toBe(createdPost.title);
            expect(createdPost.content).toBe(createdPost.content);
            expect(createdPost.blogId).toBe(createdBlog.id);

            expect(blogPosts).toBeDefined();
            expect(Array.isArray(blogPosts)).toBe(true)

        }, 10000)

        it('should return blogs and posts', async () => {
            const blogs = await blogService.get()
            const blog = await Blog.findOne({where: { title: 'test' }})
            const posts = await postService.getBlogPosts(blog.id)

            expect(posts).toBeDefined();
            expect(Array.isArray(posts)).toBe(true)
            expect(blogs).toBeDefined();
            expect(Array.isArray(blogs)).toBe(true)
        }, 10000)

        it('should return blog by userId', async () => {
            const blogs = await blogService.getUserBlogsByUserId(1)
            const blog = blogs[0].id
            const blogById = await blogService.getBlogById(blog)

            expect(blog).toBeDefined();
            expect(Array.isArray(blogs)).toBe(true)
            expect(blogById).toBeDefined()
        })

        it('should return post by userId', async () => {
            const post =  await Post.findOne({where: {title: 'test'}})
            const postById = await postService.getPostById(post.id)

            expect(postById).toBeDefined();
        })

        it('should update blog and post', async () => {
            const blog = await Blog.findOne({ where: { title: 'test' } })
            const mockUpdateBlog = { title: 'test', content: 'updated' }
            const updatedBlog = await blogService.updateBlog(blog.id, mockUpdateBlog, 1, ['Moderator'])

            const post = await Post.findOne({ where: { title: 'test' } })
            const mockUpdatePost = { title: 'test', content: 'updated' }
            const updatedPost = await postService.update(post.id, mockUpdatePost, 1, ['Moderator'])

            expect(updatedBlog).toBeDefined();
            expect(updatedBlog.title).toBe(mockUpdateBlog.title);
            expect(updatedBlog.content).toBe(mockUpdateBlog.content);

            expect(updatedPost).toBeDefined();
            expect(updatedPost.title).toBe(mockUpdateBlog.title);
            expect(updatedPost.content).toBe(mockUpdateBlog.content);

        }, 10000)

        it('should delete post', async () => {
            const post = await Post.findOne({ where: { title: 'test' } })
            await postService.delete(post.id, 1, ['Moderator'])
            const deletedPost = await Blog.findOne({ where: { id: post.id } });
            expect(deletedPost).toBeNull();

        }, 10000)

        it('should delete blog', async () => {
            const blog = await Blog.findOne({ where: { title: 'test' } })
            await blogService.deleteBlog(blog.id, 1, ['Moderator'])
            const deletedBlog = await Blog.findOne({ where: { id: blog.id } });
            expect(deletedBlog).toBeNull();
        })




    })
});