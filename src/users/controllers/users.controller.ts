import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, Req, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '@models/user.dto';
import { User } from '@models/user.interface';
import { UsersService } from '@services/users.service';
import { SerializeInterceptor } from '@app/interceptors/SerializeInterceptor';
import { Serialize } from '@decorators/Serialize';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
//@Serialize( UserDto )
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ){}

  @Post('signup')
  async createUser( @Body('user') userDto: UserDto): Promise<User>{
    //return { user : await this.usersService.signUp(userDto.email, userDto.password) }
    return await this.usersService.signUp(userDto.email, userDto.password) ;
  }

  @Post('signin')
  async signIn( @Body('user') userDto: UserDto): Promise<{ user: User, token : string }>{
    //return { user : await this.usersService.signUp(userDto.email, userDto.password) }
    console.log(userDto)
    return await this.usersService.signIn(userDto.email, userDto.password) ;
  }

  @Get()
  async findAll( @Query() userDto: UserDto): Promise<User[]>{
    return await this.usersService.findAll( userDto.email );
  }

  //@UseInterceptors( new SerializeInterceptor( UserDto ) )
  //@UseInterceptors( ClassSerializerInterceptor )
  @UseGuards( AuthGuard() )
  @Get('/:id')
  async findUser( @Req() req , @Param('id') id: number): Promise<User>{
    console.log( req );
    return await this.usersService.find( id );
  }

  @Delete('/:id')
  async removeUser( @Param('id') id: number): Promise<User>{
    return await this.usersService.remove( id );
  }

  @Patch('/:id')
  async updateUser( @Param('id') id: number, @Body('user') userDto: UserDto): Promise<User>{
    return await this.usersService.update( id,userDto.email, userDto.password );
  }

}
