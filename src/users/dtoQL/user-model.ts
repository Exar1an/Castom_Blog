import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from '../../blogs/blogs.model';
import { Post } from '../../posts/posts.model';
import { Role } from '../../roles/roles.model';
import { RoleModel } from 'src/roles/dtoQL/roles-model';
import { PostModel } from 'src/posts/dtoQL/posts-model';


@ObjectType()
export class UserModel {
    @Field()
    id: number;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    banned: boolean;
    
    @Field()
    banReason: string;

    @Field(() => [RoleModel])
    roles: RoleModel[];
    
    @Field(() => [PostModel])
    posts: PostModel[]

    // @Field(() => [Blog])
    // blogs: Blog[]
}