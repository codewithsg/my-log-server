import { Injectable } from "@nestjs/common";
import {JwtService} from '@nestjs/jwt'
import mongoose from "mongoose";

interface IPayload{
    id:mongoose.Types.ObjectId,
    email:string,
    name:string
}

@Injectable()
export class AuthenticationService{
    constructor(private jwtService:JwtService){}

    async assignToken(payload:IPayload){
        return await this.jwtService.sign(payload);
    }

    async verifyToken(token:string){
        return await this.jwtService.verify(token);
    }
}

