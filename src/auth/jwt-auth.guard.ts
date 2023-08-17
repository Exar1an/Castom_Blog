import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }


    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getContext().req;
        try {
          
          const type: string = context.getType();
          let token, header;
    
          if (type === 'graphql') {
            header = context.getArgs()[2].req.headers.authorization;
            token = header.slice(header.indexOf(' ') + 1);
          } else if (type === 'rpc') {
            const metadata = context.getArgByIndex(1);
            if (!metadata) {
              return false;
            }
            header = metadata.get('Authorization')[0];
          } else if (type === 'http') {
            header = context.getArgs()[1].req.headers.authorization;
            token = header.slice(header.indexOf(' ') + 1);
          } else {
            return false;
          }
    
          if (header && header.indexOf('Bearer ') > -1) {
            token = header.slice(header.indexOf(' ') + 1);
            const decoded = await this.jwtService.verify(token);
            if (!decoded) {
              return false;
            }
            
            req.res.locals.userId = decoded.id;
            req.res.locals.roles = decoded.roles.map(({ value }) => value);
            req.user = decoded
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return;
        }
      }
}