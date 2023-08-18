import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from '../../users/dtoQL/user-model';
import { RoleModel } from './roles-model';

@ObjectType()
export class UserRolesModel {
    @Field()
    id: number;

    @Field(() => UserModel)
    userId: number;

    @Field(() => RoleModel)
    roleId: number;

}