import { Body, Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILoginUser, IRegisterUser } from 'src/interfaces/user.interface';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
class AuthService {
    constructor(@InjectModel('user') private userModel:Model<UserDocument>){ }

    async register(@Body() newUser:IRegisterUser){
        return await new this.userModel(newUser).save();
    }

    async login(@Body() user:ILoginUser){
        return await this.userModel.findOne({email:user.email});
    }
}

export {AuthService}
