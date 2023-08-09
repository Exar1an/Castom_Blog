import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role, @InjectModel(UserRoles) private userRoles: typeof UserRoles) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({
            where: {
                value
            }
        })
        return role;
    }

    async getRolesList() {
        const rolesList = await this.roleRepository.findAll()
        return rolesList
    }


    async getUserRoles(userId: number) {
        const userRoles = await this.userRoles.findAll({
            where: {
                userId
            },
        })
        return userRoles
    }
}
