import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy( Strategy ) {

  constructor( private readonly authService: UsersService, private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.jwt_secret,
    });

  }

  async validate(payload: User) : Promise<User> {
    const user = await this.authService.signIn( payload.email, payload.password);
    return { ...user.user, password: payload.password };
  }


}
