import {Body, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IBookDescription, ICreateBookDescriptionDto } from 'src/interfaces/book-description.interface';
import { BookDescriptionDocument } from 'src/schemas/book-log/book-description.schema';

@Injectable()
export class BookDescriptionService{
    constructor(
        @InjectModel('book-description') private bookDescriptionModel:Model<BookDescriptionDocument>
    ){ }

    async create(newBookDescription:ICreateBookDescriptionDto){
        return await new this.bookDescriptionModel(newBookDescription).save();
    }
    
    async getAll(){
        return await this.bookDescriptionModel.find();
    }

    async getOne(id:mongoose.Types.ObjectId){
        return await this.bookDescriptionModel.findById(id);
    }

    async update(id:mongoose.Types.ObjectId,bookDescription:IBookDescription){
        return await this.bookDescriptionModel.findByIdAndUpdate(id,bookDescription,{new:true})
    }

    async delete(id:mongoose.Types.ObjectId){
        return await this.bookDescriptionModel.findByIdAndDelete(id);
    }   
    
}