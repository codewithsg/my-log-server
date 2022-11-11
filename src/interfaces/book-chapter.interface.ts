import mongoose from "mongoose";

interface ICreateBookChapterDto{
    chapter:string;
    thought:string;
    book:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
}

interface IBookChapter{
    _id:mongoose.Types.ObjectId;
    chapter:string;
    thought:string;
    book:mongoose.Types.ObjectId;
    user:mongoose.Types.ObjectId;
}

export {ICreateBookChapterDto,IBookChapter}