/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { couldStartTrivia } from "typescript";
import { User } from "../../user/models/user.interface";
import { UserService } from "../../user/service/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserService))
        private userService: UserService
        ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if(!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role) > -1;
                let hasPermission : boolean = false;

                if(hasRole()) {
                    hasPermission = true
                };
                return user && hasPermission;
            })
        )
    }
}
function matchRoles(roles: string[], roles1: any): boolean | Promise<boolean> | Observable<boolean> {
    throw new Error("Function not implemented.");
}

// console.log(request);
// console.log(user);
//  return true;