import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ICreateSelfLog, ISelfLog } from 'src/interfaces/self-log.interface';
import { SelfLogDocument } from 'src/schemas/self-log.schema';

@Injectable()
export class SelfLogService{
    constructor(
        @InjectModel('self') private selfLogModel:Model<SelfLogDocument>
    ){}

    async create(log:ICreateSelfLog){
        return await new this.selfLogModel(log).save();
    }

    async getById(id:mongoose.Types.ObjectId){
        return await this.selfLogModel.findById(id);
    }

    async getAll(userId:mongoose.Types.ObjectId){
        return await this.selfLogModel.find({user:`${userId}`})
    }

    async deleteById(id:mongoose.Types.ObjectId){
        return await this.selfLogModel.findByIdAndDelete(id)
    }

    async update(id:string,log:ISelfLog){
        return await this.selfLogModel.findByIdAndUpdate(id,log,{new:true})
    }
}