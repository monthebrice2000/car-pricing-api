import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users.module';
import { AppController } from '@app/app.controller';
import { ReportsModule } from '@modules/reports.module';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs_sqlite } from '@configs/configs_sqlite';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthStrategy } from '@middlewares/auth.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.jwt_secret,
      signOptions: {
        algorithm: "HS256",
        expiresIn :  '1d'
      }
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.MODE}`]

    }),
    TypeOrmModule.forRoot( configs_sqlite() ),
    UsersModule,
    ReportsModule],
  controllers: [AppController],
  providers: [AppService, AuthStrategy],
})
export class AppModule {}
