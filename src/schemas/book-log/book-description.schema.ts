import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type BookDescriptionDocument = BookDescription & Document

@Schema()
export class BookDescription{
    @Prop({required:true})
    name:string

    @Prop()
    bookCoverPicture:string

    @Prop({required:true})
    author:string

    @Prop({required:true,type:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]})
    user:mongoose.Types.ObjectId
}

export const BookDescriptionSchema = SchemaFactory.createForClass(BookDescription);
