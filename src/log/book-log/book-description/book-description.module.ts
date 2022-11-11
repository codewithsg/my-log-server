import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { BookDescriptionSchema } from "src/schemas/book-log/book-description.schema";
import { BookDescriptionService } from "./book-description.service";
import { CreateBookDescriptionController } from "./create-book-description/create-book-description.controller";

@Module({
    controllers:[
        CreateBookDescriptionController
    ],
    providers:[
        BookDescriptionService
    ],
    imports:[
        MongooseModule.forFeature([{name:'book-description',schema:BookDescriptionSchema}]),
    ]
})

export class BookDescriptionModule{}