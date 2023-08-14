import { Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards, UsePipes, Res, Param } from '@nestjs/common/decorators';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';


@ApiTags('Users Controllers.')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @ApiOperation({summary: 'Create user.'})
    @ApiResponse({status: 201, type: User})
    @Roles('Moderator')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users.'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('Moderator', 'Writer')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Give a role.'})
    @ApiResponse({status: 200})
    @Roles('Moderator')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Roles('Moderator')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }

    @ApiOperation({summary: 'Update user'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    async updateUser(@Body() dto: UpdateUserDto, @Res() res: Response, @Param('id') id: number) {
        const {userId} = res.locals
        const {roles} = res.locals
        const response =  await this.userService.update(dto, id, userId, roles)
        res.send(response)
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Roles('Moderator')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async deleteUser(@Res() res: Response, @Param('id') id: number) {
        const {userId} = res.locals
        const response =  await this.userService.delete(id, userId)
        res.send(response)
    }

}
