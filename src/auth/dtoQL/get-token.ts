import { ObjectType, Field } from '@nestjs/graphql';



@ObjectType()
export class TokenModel {
    @Field()
    token: string;
}