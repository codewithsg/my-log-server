import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose,{Document} from "mongoose"

export type SelfLogDocument = SelfLog & Document

@Schema()
export class SelfLog{
    @Prop({required:true})
    title:string

    @Prop({required:true})
    description:string

    @Prop({required:true,type:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}]})
    user:mongoose.Types.ObjectId
}

export const SelfLogSchema = SchemaFactory.createForClass(SelfLog);