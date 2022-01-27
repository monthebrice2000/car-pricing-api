import { CallHandler, NestInterceptor } from '@nestjs/common/interfaces/features/nest-interceptor.interface';
import { ExecutionContext } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { UserDto } from '@models/user.dto';
import { plainToClass } from 'class-transformer';


export class SerializeInterceptor implements NestInterceptor{

  constructor( private dto: any ) {
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> {

    console.log( 'handle data before request')

    return next.handle().pipe(
      map( (data:any) => {
        return plainToClass( this.dto , data, {
          excludeExtraneousValues: true
        })
      })
    )
  }

}