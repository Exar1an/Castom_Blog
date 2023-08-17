import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Inject, UseGuards } from '@nestjs/common/decorators';
import { GetUserArgs } from './dtoQL/get-user-by-email';
import { UserModel } from './dtoQL/user-model';
import { UserId } from './reqUserParams/userId';
import { UserRolesParam } from './reqUserParams/userRoles';

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
    async getAllUsers(@UserId() userId: number, @UserRolesParam() roles: []) {
        console.log(roles)
        return await this.userService.getAllUsers();
    }



    // @Mutation()
    // @Roles('Moderator')
    // @UseGuards(RolesGuard)
    // async createUser(@Args('userDto') userDto: CreateUserDto) {
    //     return this.userService.createUser(userDto);
    // }

    // @Query()
    // @Roles('Moderator', 'Writer')
    // @UseGuards(RolesGuard)
    // async getAllUsers() {
    //     return this.userService.getAllUsers();
    // }

    // @Mutation()
    // @Roles('Moderator')
    // @UseGuards(RolesGuard)
    // async addRole(@Args('dto') dto: AddRoleDto) {
    //     return this.userService.addRole(dto);
    // }

    // @Mutation()
    // @Roles('Moderator')
    // @UseGuards(RolesGuard)
    // async ban(@Args('dto') dto: BanUserDto) {
    //     return this.userService.ban(dto);
    // }

    // @Mutation()
    // @UseGuards(JwtAuthGuard)
    // async updateUser(@Args('dto') dto: UpdateUserDto, @Context() context) {
    //     const { userId, roles } = context.req.res.locals;
    //     return this.userService.update(dto, context.id, userId, roles);
    // }

    // @Mutation()
    // @Roles('Moderator')
    // @UseGuards(RolesGuard)
    // async deleteUser(@Args('id') id: number, @Context() context) {
    //     const { userId } = context.req.res.locals;
    //     return this.userService.delete(id, userId);
    // }
}
