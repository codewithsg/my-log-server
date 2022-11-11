import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type BookChapterDocument = BookChapter & Document;

@Schema()
export class BookChapter{
    @Prop({required:true})
    chapter:string

    @Prop({required:true})
    thought:string

    @Prop({required:true , type:[{type:mongoose.Schema.Types.ObjectId,ref:'book-description'}]})
    book:mongoose.Types.ObjectId

    @Prop({required:true,type:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]})
    user:mongoose.Types.ObjectId
}

export const BookChapterSchema = SchemaFactory.createForClass(BookChapter);