import { SerializeInterceptor } from '@interceptors/SerializeInterceptor';
import { UseInterceptors } from '@nestjs/common';


export const Serialize = ( dto : any ) => {
  return UseInterceptors( new SerializeInterceptor( dto ) );
}