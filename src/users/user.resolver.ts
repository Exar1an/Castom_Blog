import { Resolver, Args, Mutation, Query, Context, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { GetUserArgs} from './dtoQL/get-user-by-email';
import { UserModel } from './dtoQL/user-model';
import { UserId } from './reqUserParams/userId';
import { UserRolesParam } from './reqUserParams/userRoles';
import { CreateUserInput } from './dtoQL/input/create-user';
import { UpdateUserInput } from './dtoQL/input/update-user';
import { AddRoleInput } from './dtoQL/input/add-role';
import { BanUserInput } from './dtoQL/input/ban-user';

@Resolver(() => UserModel)
export class UsersResolver {
    constructor(private userService: UsersService) { }

    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Query(() => UserModel, {name: 'user', nullable: true})
    user(@Args() getUserArgs: GetUserArgs) {
        return this.userService.getUserByEmail(getUserArgs.email);
    }


    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Query(() => [UserModel], {name: 'allusers', nullable: true})
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }


    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Mutation(() => UserModel)
    create(@Args('createUserData') createUserData: CreateUserInput){
        return this.userService.createUser(createUserData);
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => UserModel)
    update(@Args('updateUserData') updateUserData: UpdateUserInput, @Args('id', { type: () => Int }) id: number, @UserId() userId: number, @UserRolesParam() roles: []){
        return this.userService.update(updateUserData, id, userId, roles);
    }

    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard) 
    @Mutation(() => Boolean)
    async addRole(@Args('addRoleData') addRoleData: AddRoleInput) {
        await this.userService.addRole(addRoleData);
        return true
    }

    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Mutation(() => UserModel)
    ban(@Args('banUserData') banUserData: BanUserInput) {
        return this.userService.ban(banUserData);
    }

    @Roles('Moderator')
    @UseGuards(RolesGuard, JwtAuthGuard)
    @Mutation(() => Boolean)
    delete(@Args('id', { type: () => Int }) id: number, @UserId() userId: number) {
        return this.userService.delete(id, userId);
    }
    
}
