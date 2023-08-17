import { ObjectType, Field } from '@nestjs/graphql';


@ObjectType()
export class RoleModel {
    @Field()
    id: number;

    @Field()
    value: string;

    @Field()
    description: string;

}