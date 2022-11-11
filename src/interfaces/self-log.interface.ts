import mongoose from "mongoose";

interface ICreateSelfLog{
    title:string;
    description:string;
    user:mongoose.Types.ObjectId;
}

interface ISelfLog{
    _id:mongoose.Types.ObjectId;
    title:string;
    description:string;
    user:mongoose.Types.ObjectId
}

export {ICreateSelfLog,ISelfLog}