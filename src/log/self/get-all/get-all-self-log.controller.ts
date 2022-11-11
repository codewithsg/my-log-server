import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { Response,Request } from "express";
import { SelfLogService } from "../self-log.service";

@Controller('self-log/get')
export class GetAllSelfLogController{
    constructor(
        private selfLogService:SelfLogService
    ){}

    @Get()
    async getAll(
        @Res() res:Response,
        @Req() req:Request
    ){
        try{
            const selfLogs = await this.selfLogService.getAll(req.user.id);
            res.status(HttpStatus.OK).json({log:selfLogs});
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}