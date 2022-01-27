import { BadRequestException, Injectable, NotFoundException, ValidationPipe } from '@nestjs/common';
import { UsersRepository } from '@repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@models/user.interface';
import { UpdateResult } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { JwtService } from '@nestjs/jwt';
const CryptoJS = require('crypto-js');

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ){}

  async create( user: User ): Promise<User>{
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save( newUser );
  }

  async find( id: number ): Promise<User>{
    return await this.usersRepository.findOne(id);
  }

  async findAll( email: string ): Promise<User[]>{
    return await this.usersRepository.find( { email } );
  }

  async update( id: number, newEmail: string, newPassword: string ): Promise<User>{
    const user = await this.usersRepository.findOne(id);
    Object.assign(user, {email:newEmail, password:newPassword});
    return await this.usersRepository.save( user);
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);
    return await this.usersRepository.remove(user);
  }

  async signUp( email: string, password: string ) : Promise<User> {
    const user = await this.usersRepository.findOne({email});
    if( user ){
      throw new BadRequestException("Email already exists");
    }

    const hashPassword = JSON.stringify( CryptoJS.SHA256( password ,'tontonlaforce') );

    const newUser = await this.usersRepository.create( { email: email, password: hashPassword });
    console.log( );
    return await this.usersRepository.save(newUser);
  }

  async signIn( email: string, password: string ) : Promise<{ user : User, token : string }> {
    const user = await this.usersRepository.findOne({email});
    if( !user ){
      throw new NotFoundException("User " + email + " not found");
    }

    const hashPassword = JSON.stringify( CryptoJS.SHA256( password ,'tontonlaforce') );
    console.log( hashPassword );
    console.log(  user.password );

    if( hashPassword === user.password ){
      const payload : User = { id : user.id, email : user.email, password: password };
      console.log( payload, password )
      const token = await this.jwtService.signAsync( payload, { secret : process.env.jwt_secret } );
      return { user : user, token };
    }else{
      throw new BadRequestException("Bad Password");
    }


  }
}
