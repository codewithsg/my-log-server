import {Controller,Delete,Res,Param,HttpStatus, Req} from '@nestjs/common'
import { Request, Response } from 'express';
import { SelfLogService } from '../self-log.service';

@Controller('self-log/delete/:id')
export class DeleteSelfLogController{
    constructor(
        private selfLogService:SelfLogService
    ){}

    @Delete()
    async deleteSelfLog(
        @Res() res:Response,
        @Param() params
    ){
        try{
            const removedSelfLog = await this.selfLogService.deleteById(params.id);
            if(removedSelfLog===null)
                return res.status(HttpStatus.NOT_ACCEPTABLE).json({message:'Log not found'});
            res.status(HttpStatus.OK).json({log:removedSelfLog});
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}