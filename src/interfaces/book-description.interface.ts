import mongoose from "mongoose";

interface ICreateBookDescriptionDto{
    name:string;
    author:string;
    bookCoverPicture:string;
    user:mongoose.Types.ObjectId;
}

interface IBookDescription{
    name:string;
    author:string;
    bookCoverPicture:string;
    user:[mongoose.Types.ObjectId];
    _id:mongoose.Types.ObjectId
}

export {ICreateBookDescriptionDto,IBookDescription}