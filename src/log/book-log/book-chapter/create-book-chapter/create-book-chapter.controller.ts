import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ICreateBookChapterDto } from "src/interfaces/book-chapter.interface";
import { BookChapterService } from "../book-chapter.service";

@Controller('book-chapter/create')
export class CreateBookChapterController{
    constructor(
        private bookChapterService:BookChapterService
    ){}

    @Post()
    async create(
        @Req() req:Request,
        @Res() res:Response,
        @Body() createBookChapterDto:ICreateBookChapterDto
    ){
        try{
            if(!req.user)
                return res.status(HttpStatus.FORBIDDEN).json({messsage:'Login to continue'})
            createBookChapterDto.user = req.user.id;
            if(!createBookChapterDto.book)
                return res.status(HttpStatus.BAD_REQUEST).json({message:'Please Select Book'})
            const newChapter = await this.bookChapterService.create(createBookChapterDto);
            if(newChapter===null)
                return res.status(HttpStatus.NO_CONTENT).json({message:'Please, try again!'});
            res.status(HttpStatus.OK).json({log:newChapter})
        }catch(err:any){
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}