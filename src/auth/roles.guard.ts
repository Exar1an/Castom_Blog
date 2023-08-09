import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { time } from "console";
import { Observable } from 'rxjs'
import { ROLES_KEY } from "./roles-auth.decorator";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { Role } from "src/roles/roles.model";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflector: Reflector) {
    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if(!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({ message: 'User is not authorized' })
            }

            const user = this.jwtService.verify(token)
            req.user = user;
            console.log(user)
            return user.roles.some((role: Role) => requiredRoles.includes(role.value))

        } catch (err) {

            throw new HttpException('No access', HttpStatus.FORBIDDEN);

        }
    }
}