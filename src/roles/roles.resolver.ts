import { Resolver, Args, Mutation, Query, Context, Int } from '@nestjs/graphql';
import { RoleModel } from './dtoQL/roles-model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RolesService } from './roles.service';
import { UseGuards } from '@nestjs/common/decorators';
import { CreateRoleInput } from './dtoQL/input/create-role';
import { GetRoleByValue } from './dtoQL/get-role';
import { UserId } from 'src/users/reqUserParams/userId';





@Resolver(() => RoleModel)
export class RolesResolver {
    constructor(private rolesService: RolesService) { }

    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Mutation(() => RoleModel)
    createRole(@Args('createRoleData') createRoleData: CreateRoleInput) {
        return this.rolesService.createRole(createRoleData)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => RoleModel)
    getRole(@Args() getRole: GetRoleByValue) {
        return this.rolesService.getRoleByValue(getRole.value)
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [RoleModel])
    getAllRoles() {
        return this.rolesService.getRolesList()
    }

}