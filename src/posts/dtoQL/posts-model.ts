import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from 'src/users/dtoQL/user-model';
import { User } from 'src/users/users.model';


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

    @Field(() => UserModel)
    author: UserModel

    // @Field()
    // blog: Blog

}