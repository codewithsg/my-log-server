import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ICreateBookChapterDto } from "src/interfaces/book-chapter.interface";
import { BookChapterDocument } from "src/schemas/book-log/book-chapter.schema";

@Injectable()
export class BookChapterService{
    constructor(
        @InjectModel('book-chapter') private bookChapterModel:Model<BookChapterDocument>
    ){}

    async create(newBookChapter:ICreateBookChapterDto){
        return await new this.bookChapterModel(newBookChapter).save();
    }

    async getById(id:mongoose.Types.ObjectId){
        return await this.bookChapterModel.findById(id);
    }

    async getAllByUserId(userId:mongoose.Types.ObjectId){
        return await this.bookChapterModel.find({user:userId})
    }

    async deleteById(id:mongoose.Types.ObjectId){
        return await this.bookChapterModel.deleteOne(id)
    }
}