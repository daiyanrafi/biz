/* eslint-disable prettier/prettier */
import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { catchError, map, Observable, of } from 'rxjs';
import { hasRoles } from '../../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-guards';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';
@Controller('users')
export class UserController {

    constructor(private userService: UserService){ }

    //for getting
    @Post()
    create(@Body()user: User): Observable<User | Object >{
    return this.userService.create(user).pipe(
        map((user: User) => user),
        catchError(err => of({error: err.message}))
    )
}

//user login
 @Post('login')
login(@Body() user: User): Observable<Object>{
    return this.userService.login(user).pipe(
        map((jwt: string) => {
            return {access_token: jwt};
         })
    )
}
///////////////////////////////////
    @Get(':id')
    findOneBy(@Param()params): Observable<User>{
        return this.userService.findOne(params.id);
    }

    //admin update 
    @Get()
    index( @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1, @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10, ): Observable<Pagination<User>> {
       limit = limit > 100 ? 100 : limit;
        return this.userService.paginate({page: Number(page), limit: Number(limit), route: 'http://localhost:3000/users'})
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<User>{
        return this.userService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any>{
        return this.userService.updateOne(Number(id), user);
    }
    //update role for user
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(@Param('id') id: string, @Body() user: User): Observable<User> {
        return this.userService.updateRoleOfUser(Number(id), user);
    }
}
