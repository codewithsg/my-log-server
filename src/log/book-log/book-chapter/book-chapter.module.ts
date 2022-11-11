import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookChapterSchema } from "src/schemas/book-log/book-chapter.schema";
import { BookChapterService } from "./book-chapter.service";
import { CreateBookChapterController } from "./create-book-chapter/create-book-chapter.controller";

@Module({
    controllers:[
        CreateBookChapterController
    ],
    providers:[
        BookChapterService
    ],
    imports:[
        MongooseModule.forFeature([{name:'book-chapter',schema:BookChapterSchema}])
    ]
})

export class BookChapterModule{}