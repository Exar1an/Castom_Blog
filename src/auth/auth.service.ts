import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model';
import { RegistrationUserDto } from './dto/reg-user.dto';
import { LoginUserDto } from './dto/log-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService){}

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: RegistrationUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if(candidate) {
            throw new HttpException('User with such email already exist', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUserByReg({...userDto, password: hashPassword, firstName: 'name', lastName: 'second name'});
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: RegistrationUserDto){
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message: "Incorrect password or email."})
    }

}
