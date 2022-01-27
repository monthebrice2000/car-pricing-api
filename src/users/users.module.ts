import { Module } from '@nestjs/common';
import { UsersController } from '@controllers/users.controller';
import { UsersService } from '@services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@repositories/users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature( [UsersRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.jwt_secret,
      signOptions: {
        algorithm: "HS256",
        expiresIn :  '1d'
      }
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [ UsersService ]
})
export class UsersModule {}
