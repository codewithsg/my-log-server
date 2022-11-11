import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';
import { BcryptService } from 'src/utils/bcrypt.service';
import { AuthService } from '../auth.service';
import {ILoginUser} from './../../interfaces/user.interface';

@Controller('auth/login')
export class LoginUserController {
    constructor(
        private authService:AuthService,
        private bcryptService:BcryptService,
        private authenticationService:AuthenticationService
    ){}

    @Post()
    async login(
        @Res() res:Response,
        @Body() loginUserDto:ILoginUser
    ){
        try{
            const loggedInUser = await this.authService.login(loginUserDto);
            if(loggedInUser==null)
                return res.status(HttpStatus.NOT_FOUND).json({message:'User is not available in system, try register new user'});
            
            /* checking password */
            const isPasswordMatch = await this.bcryptService.comparePassword(loginUserDto.password,loggedInUser.password);
            if(!isPasswordMatch)
                return res.status(HttpStatus.NOT_ACCEPTABLE).json({message:'Password does not match, try again'});

            /* assigning token */
            const token = await this.authenticationService.assignToken({
                id:loggedInUser._id,
                name:loggedInUser.name,
                email:loggedInUser.email
            });
            res.status(HttpStatus.OK).json({token,user:loggedInUser})
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err)
        }
    }
}
