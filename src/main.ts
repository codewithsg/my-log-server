import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

declare global{
  namespace Express{
    interface Request{
      user:{
        id:mongoose.Types.ObjectId,
        name:string,
        email:string,
        iat:number,
        exp:number
      }
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
