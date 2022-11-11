import {Controller,Post,Res,Req,Body,HttpStatus} from '@nestjs/common';
import { Request,Response } from 'express';
import { unwatchFile } from 'fs';
import { ICreateSelfLog } from 'src/interfaces/self-log.interface';
import { SelfLogService } from '../self-log.service';

@Controller('self-log/create')
export class CreateSelfLogController{
    constructor(private selfLogService:SelfLogService){}

    @Post()
    async create(
        @Req() req:Request,
        @Res() res:Response,
        @Body() createSelfLogDto:ICreateSelfLog
    ){
        try{
            if(!req.user){
               return res.status(HttpStatus.FORBIDDEN).json({message:'Login to continue'})
            }
            if(!req.user.id)
                return res.status(HttpStatus.CONFLICT).json({message:'Problem with user validation, Please login again'});
            
            createSelfLogDto.user = req.user.id;
            const newSelfLog = await this.selfLogService.create(createSelfLogDto);
            if(newSelfLog===null)
                return res.status(HttpStatus.NOT_FOUND).json({message:'Problem creating log'})
            res.status(HttpStatus.OK).json({log:newSelfLog})
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}