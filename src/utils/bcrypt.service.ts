import { Injectable } from "@nestjs/common";
import {hash,compare} from 'bcrypt';

@Injectable()

export class BcryptService{
    saltRound=13;
    constructor(){}

    async encryptPassword(password:string){
        return await hash(password,this.saltRound); 
    }

    async comparePassword(password:string,encryptedPassword:string){
        return await compare(password,encryptedPassword);
    }
}