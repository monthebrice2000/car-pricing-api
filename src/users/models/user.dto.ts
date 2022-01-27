import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';


export class UserDto {

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Exclude()
  id: number;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  //@Exclude()
  password: string;

}
