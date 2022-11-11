import {Controller,Get,Res,Param,HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { SelfLogService } from '../self-log.service';

@Controller('/self-log/get/:id')
export class GetByIdSelfLogController{
    constructor(
        private selfLogService:SelfLogService
    ){}

    @Get()
    async getById(
        @Res() res:Response,
        @Param() params
    ){
        try{
            const selfLog = await this.selfLogService.getById(params.id);
            if(selfLog===null)
                return res.status(HttpStatus.NOT_ACCEPTABLE).json({message:'Log is not available of provided id'});
            res.status(HttpStatus.OK).json({log:selfLog});
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}