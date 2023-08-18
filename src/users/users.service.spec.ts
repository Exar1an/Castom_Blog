import { UsersService } from './users.service';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { Sequelize } from 'sequelize-typescript';
import { createMemDB } from '../utils/create-memDB';
import { Post } from '../posts/posts.model';
import { Blog } from '../blogs/blogs.model';
import { CreateUserDto } from './dto/create-user.dto';
import { timeString } from '../utils/time';
import { UpdateUserDto } from './dto/update-user.dto';

describe('The UserService', () => {

    let userService: UsersService
    let memDb: Sequelize;
    beforeAll(async () => {
        memDb = await createMemDB([User, Role, UserRoles, Post, Blog])
        userService = new UsersService(User, new RolesService(Role, UserRoles))
    });

        afterAll(async () => {
        const users = await User.findAll({where: { firstName: 'test'}})

        for (const user of users) {
            await user.destroy();
        }
        memDb.close()
    });
    describe('Testing UsersService', () => {

        it('should create user', async () => {
            const mockEmail = `test${timeString}@example.com`
            const dto: CreateUserDto = { email: mockEmail, password: "qwerty123", firstName: "test", lastName: "testovich"}
            const createdUser = await userService.createUser(dto)
            expect(createdUser).toBeDefined();
            expect(createdUser.email).toBe(mockEmail);
            expect(createdUser.firstName).toBe(dto.firstName);
            expect(createdUser.lastName).toBe(dto.lastName);
        }, 10000)

        it('should return all users', async () => {
            const users = await userService.getAllUsers()
            expect(users).toBeDefined();
            expect(Array.isArray(users)).toBe(true)
        }, 10000)

        it('should update user', async () => {
            const user = await User.findOne({where: {firstName: "test"}})
            if(user){
                const mockEmail = `test${timeString}@example.com`
                const dto: UpdateUserDto = { email: mockEmail, password: "qwerty123", firstName: "test", lastName: "updated"}
                const updatedUser = await userService.update(dto, user.id, user.id, ["Moderator"])
                expect(updatedUser).toBeDefined();
                expect(updatedUser.email).toBe(mockEmail);
                expect(updatedUser.firstName).toBe(dto.firstName);
                expect(updatedUser.lastName).toBe(dto.lastName);
            }

        }, 10000)

        it('should delete user', async () => {
            const user = await User.findOne({where: {firstName: "test"}})
            if(user){
                await userService.delete(user.id, 1)
                const deletedUser = await User.findOne({ where: { id: user.id } });
                expect(deletedUser).toBeNull();
             }
        }, 10000)
    })
});