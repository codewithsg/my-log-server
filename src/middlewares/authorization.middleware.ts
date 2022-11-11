import {Injectable,NestMiddleware} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware{
    constructor(private authenticationService:AuthenticationService){}

    async use(req:Request,res:Response,next:NextFunction) {
        try{
            if(!req.headers.authorization){
                throw new Error('No token provided')
            }
             const token = req.headers.authorization.split(' ')[1]
            const loggedInUser = await this.authenticationService.verifyToken(token);
            req.user = loggedInUser
            next();
        }catch(err:any){
            throw new Error(err)
        }
    }
}