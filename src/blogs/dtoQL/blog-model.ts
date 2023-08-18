import { ObjectType, Field } from '@nestjs/graphql';
import { PostModel } from 'src/posts/dtoQL/posts-model';


@ObjectType()
export class BlogModel {

    @Field() 
    id: number;

    @Field() 
    title: string;

    @Field() 
    content: string;

    @Field()
    userId: number;

    @Field(() => [PostModel]) 
    posts: PostModel[];
    
}