import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from 'rxjs'
import { ROLES_KEY } from "./roles-auth.decorator";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { Role } from "../roles/roles.model";

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
            const header = context.getArgs()[2].req.headers.authorization;
            const token = header.slice(header.indexOf(' ') + 1);

            if (!token) {
                throw new UnauthorizedException({ message: 'User is not authorized' })
            }

            const user = this.jwtService.verify(token)
            
            return user.roles.some((role: Role) => requiredRoles.includes(role.value))

        } catch (err) {

            throw new HttpException('No access', HttpStatus.FORBIDDEN);

        }
    }
}
