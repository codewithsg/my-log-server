import { Module,MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthorizationMiddleware } from "src/middlewares/authorization.middleware";
import { SelfLogSchema } from "src/schemas/self-log.schema";
import { CreateSelfLogController } from "./create-self-log/create-self-log.controller";
import { DeleteSelfLogController } from "./delete-self-log/delete-self-log.controller";
import { GetAllSelfLogController } from "./get-all/get-all-self-log.controller";
import { GetByIdSelfLogController } from "./get-by-id/get-by-id-self-log.controller";
import { SelfLogService } from "./self-log.service";
import { UpdateSelfLogController } from "./update-self-log/update-self-log.controller";

@Module({
    imports:[
        MongooseModule.forFeature([{name:'self',schema:SelfLogSchema}]),
        
    ],
    providers:[
        SelfLogService,
    ],
    controllers:[
        CreateSelfLogController,
        GetAllSelfLogController,
        GetByIdSelfLogController,
        DeleteSelfLogController,
        UpdateSelfLogController
    ]
})

export class SelfLogModule{
    // configure(consumer:MiddlewareConsumer){
    //     consumer
    //     .apply(AuthorizationMiddleware)
    //     .forRoutes(
    //     CreateSelfLogController,
    //     GetAllSelfLogController,
    //     GetByIdSelfLogController,
    //     DeleteSelfLogController,
    //     UpdateSelfLogController
    //   )
    // }
}