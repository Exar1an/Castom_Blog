import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { User } from '../users/users.model';
import * as bcrypt from 'bcryptjs'



@Injectable()
export class SeedsService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role,
        @InjectModel(User) private userRepository: typeof User, private roleService: RolesService) { }

    async createDefaultSeeds() {
        const defaultRoles = [
            {
                value: 'Moderator',
                description: 'Moder',
            },
            {
                value: 'Writer',
                description: 'Default user',
            },
        ];

        for (const role of defaultRoles) {
            const existingRole = await this.roleRepository.findOne({
                where: { value: role.value },
            });

            if (!existingRole) {
                await this.roleRepository.create(role);
            }
        }

        await this.createFirstModerator()
        return new HttpException('Created', HttpStatus.CREATED)

    };

    async createFirstModerator() {

        const mockEmail = "moderator@gmail.com"
        const hashPassword = await bcrypt.hash("qwerty123", 5)
        const mockFirstName = 'Jhon';
        const mockLastName = 'Dou'

        const checkFirstmoderator = await this.userRepository.findOne({
            where: { email: mockEmail }
        })

        if (!checkFirstmoderator) {
            const moderator = await this.userRepository.create({ email: mockEmail, password: hashPassword, firstName: mockFirstName, lastName: mockLastName })
            const role = await this.roleService.getRoleByValue('Moderator')
            await moderator.$set('roles', [role.id])
            moderator.roles = [role]
            return;
        }

        return 
    }
}
