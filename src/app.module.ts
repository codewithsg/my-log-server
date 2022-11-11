import { Module,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilityModule} from './utils/utils.module';
import { SelfLogModule } from './log/self/self-log.module';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';
import { CreateSelfLogController } from './log/self/create-self-log/create-self-log.controller';
import { GetAllSelfLogController } from './log/self/get-all/get-all-self-log.controller';
import { GetByIdSelfLogController } from './log/self/get-by-id/get-by-id-self-log.controller';
import { DeleteSelfLogController } from './log/self/delete-self-log/delete-self-log.controller';
import { UpdateSelfLogController } from './log/self/update-self-log/update-self-log.controller';
import { BookDescriptionModule } from './log/book-log/book-description/book-description.module';
import { MulterModule } from '@nestjs/platform-express';
import { CreateBookDescriptionController } from './log/book-log/book-description/create-book-description/create-book-description.controller';
import { BookChapterModule } from './log/book-log/book-chapter/book-chapter.module';
import { CreateBookChapterController } from './log/book-log/book-chapter/create-book-chapter/create-book-chapter.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    // MulterModule.register({dest:'./uploads'}),
    AuthModule,
    UtilityModule,
    SelfLogModule,
    BookDescriptionModule,
    BookChapterModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(
        CreateSelfLogController,
        GetAllSelfLogController,
        GetByIdSelfLogController,
        DeleteSelfLogController,
        UpdateSelfLogController,
        CreateBookDescriptionController,
        CreateBookChapterController
        )
  }
}
