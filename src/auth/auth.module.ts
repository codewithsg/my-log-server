import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserController } from './login-user/login-user.controller';
import { RegisterUserController } from './register-user/register-user.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from 'src/schemas/user.schema';
import { UtilityModule } from 'src/utils/utils.module';

@Module({
  providers: [
    AuthService
  ],
  controllers: [
    LoginUserController,
    RegisterUserController
  ],
  imports:[
    MongooseModule.forFeature([{name:'user',schema:UserSchema}]),
    UtilityModule,
  ]
})

export class AuthModule {}
