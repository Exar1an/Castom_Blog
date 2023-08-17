import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from '../../blogs/blogs.model';
import { Post } from '../../posts/posts.model';
import { Role } from '../../roles/roles.model';


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

    // @Field(() => [Role])
    // roles: Role[];
    
    // @Field(() => [Post])
    // posts: Post[]

    // @Field(() => [Blog])
    // blogs: Blog[]
}