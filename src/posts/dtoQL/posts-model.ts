import { ObjectType, Field } from '@nestjs/graphql';
import { BlogModel } from '../../blogs/dtoQL/blog-model';


@ObjectType()
export class PostModel {
    @Field()    
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    image: string;

    @Field()
    userId: number;

    @Field()
    blogId: number;

    @Field(() => BlogModel)
    blog: BlogModel

}