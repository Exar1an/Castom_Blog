import { Injectable, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import * as bcrypt from 'bcryptjs'
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesValue } from '../posts/posts.service';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }


    async createUser(dto: CreateUserDto) {
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userRepository.create({...dto, password: hashPassword})
        const role = await this.roleService.getRoleByValue('Writer')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async createUserByReg(dto: CreateUserDto) {
        const user = await this.userRepository.create({...dto})
        const role = await this.roleService.getRoleByValue('Writer')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: {
                all: true
            }
        });
        return users;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            include: {
                all: true
            }
        })
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    };

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: dto.userId
            },
            include: {
                all: true
            }
        });

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        const roleValue = user.roles.map(({ value }) => value);
        const isModerator = roleValue.includes('Moderator'); 

        if (isModerator) {
            throw new HttpException('No access to ban', HttpStatus.FORBIDDEN)
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return new HttpException('Banned', HttpStatus.OK);
        
    }

    async update(dto: UpdateUserDto, id: number, userId: number, roles: RolesValue) {
        const user = await this.userRepository.findByPk(id)

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isModerator = roles.includes('Moderator')
        if(!isModerator && user.id !== userId) {
            throw new ForbiddenException(`You don't have permission to update this user`);
          }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        await user.update({...dto, password: hashPassword})  
        return user
        
    }

    async delete(id: number, userId: number) {
        const user = await this.userRepository.findByPk(id)

        if(!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if(user.id == userId) {
            throw new ForbiddenException(`You cannot delete yourself!`);
          }

        await user.destroy()
        return new HttpException('Deleted', HttpStatus.ACCEPTED)
        
    }

}
