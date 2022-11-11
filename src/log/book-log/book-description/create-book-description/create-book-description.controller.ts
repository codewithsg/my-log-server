import {Controller,Post,Body,UploadedFile, ParseFilePipeBuilder, HttpStatus, Res, UseInterceptors, Req} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import { create } from 'domain';
import {Express, Request, Response } from 'express';
import { diskStorage } from 'multer';
import { ICreateBookDescriptionDto } from 'src/interfaces/book-description.interface';
import { BookDescriptionService } from '../book-description.service';

@Controller('book-description/create')
export class CreateBookDescriptionController{
    constructor(
        private bookDescriptionService:BookDescriptionService,
    ){}

    @Post()
    @UseInterceptors(FileInterceptor('file',{
        storage:diskStorage({
            destination:'./src/uploads',
            filename:(req,file,cb)=>{
                return cb(null,`${Date.now()}-${file.originalname}`)
            },
        }),
        fileFilter:(req,file,cb)=>{
            const mimeType = file.mimetype.split('/')[0]
            if(mimeType ==='image'){
                return cb(null,true)
            }else{
                return cb(new Error('Only image files are allowed'),false)
            }
        }
    })
    )
   async createBookDescription(
    @UploadedFile() file:Express.Multer.File,
    @Req() req:Request,
    @Res() res:Response,
    @Body() createBookDescriptionDto:ICreateBookDescriptionDto
   ){
    try{
        if(file===null)
            return res.status(HttpStatus.BAD_REQUEST).json({message:'File cannot be uploaded'})
        createBookDescriptionDto.bookCoverPicture = file.filename;
        createBookDescriptionDto.user = req.user.id;
        const createdBookDescription = await this.bookDescriptionService.create(createBookDescriptionDto);
        res.status(HttpStatus.OK).json({bookDescription:createdBookDescription})
    }catch(err:any){
        return res.status(HttpStatus.BAD_REQUEST).json(err);
    }
    }
    


}
