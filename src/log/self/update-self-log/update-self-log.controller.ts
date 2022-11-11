import {Controller,Put,Req,HttpStatus,Res,Param,Body} from '@nestjs/common';
import { Response,Request } from 'express';
import { ISelfLog } from 'src/interfaces/self-log.interface';
import { SelfLogService } from '../self-log.service';

@Controller('self-log/update/:id')
export class UpdateSelfLogController{
    constructor(
        private selfLogService:SelfLogService
    ){}

    @Put()
    async update(
        @Req() req:Request,
        @Res() res:Response,
        @Param() params,
        @Body() updateSelfLogDto:ISelfLog
    ){
        try{
            if(!req.user)
                return res.status(HttpStatus.FORBIDDEN).json({message:'Login please'});
            const selfLog = await this.selfLogService.getById(params.id);
            if(req.user.id != selfLog.user)
                return res.status(HttpStatus.FORBIDDEN).json({message:'You are not authorized to edit this log'});
            const updatedSelfLog = await this.selfLogService.update(params.id,updateSelfLogDto);
            if(updatedSelfLog===null)
                return res.status(HttpStatus.NO_CONTENT).json({message:'Problem Updating'});
            res.status(HttpStatus.OK).json({log:updatedSelfLog})

        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}