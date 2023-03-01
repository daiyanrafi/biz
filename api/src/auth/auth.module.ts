/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';

@Module({
    imports:[
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                //secret: process.env.JWT_SECRET
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '1000000s'}
            })
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}

//JWT_SECRET