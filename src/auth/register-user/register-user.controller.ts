import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IRegisterUser } from 'src/interfaces/user.interface';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';
import { BcryptService } from 'src/utils/bcrypt.service';
import { AuthService } from '../auth.service';

@Controller('auth/register')
export class RegisterUserController {
    constructor(
        private authService:AuthService,
        private bcryptService:BcryptService,
        private authenticationService:AuthenticationService
    ){}

    @Post()
    async register(
        @Res() res:Response,
        @Body() registerUserDto:IRegisterUser
    ){
        try{
            /* encrypting password */
            registerUserDto.password = await this.bcryptService.encryptPassword(registerUserDto.password);

            /* saving database to user */
            const registeredUser = await this.authService.register(registerUserDto);
            if (registeredUser === null) {
                return res
                  .status(HttpStatus.NO_CONTENT)
                  .json({ message: 'Cannot register user with provided information' });
              }

            /* assigning  jwt-token */
            const token = await this.authenticationService.assignToken({
                id:registeredUser._id,
                email:registeredUser.email,
                name:registeredUser.name
            });

            res.status(HttpStatus.OK).json({token,user:registeredUser});
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json({err})
        }
    }
}
