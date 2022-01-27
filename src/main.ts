import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SerializeInterceptor } from '@app/interceptors/SerializeInterceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe( {whitelist : true }) );
  //app.useGlobalInterceptors( new SerializeInterceptor() )
  await app.listen(3000);
}
bootstrap();
