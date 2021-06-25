import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InsertResult, UpdateResult } from 'typeorm';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {

    MulterModule.registerAsync({
        useFactory: () => ({
            dest: '/home/upload/',
        }),
    });
  }

  @Get()
  async getAllCats(): Promise<Cat[]> {
    return this.catsService.getAllCats();
  }

  @Get('id/:id')
  async getCat(@Param('id') id: string): Promise<Cat> {
    return this.catsService.getCat(id);
  }

  @Get('page/:page')
  async getPage(@Param('page') page: string): Promise<Cat[]> {
    return this.catsService.getPage(Number.parseInt(page));
  }

  @Get('page/:page/limit/:limit')
  async getPageWithOffset(@Param('page') page: string, @Param('limit') limit: string): Promise<Cat[]> {
    return this.catsService.getPage(Number.parseInt(page), Number.parseInt(limit));
  }

  @Get('booked')
  async getBookedCats(): Promise<Cat[]> {
    return this.catsService.getBookedCats();
  }


  @Get('available')
  async getAvailableCats(): Promise<Cat[]> {
    return this.catsService.getAvailableCats();
  }

  @Put('book/:id')
  async bookCat(@Param('id') id: string): Promise<UpdateResult> {
    return this.catsService.bookCat(id);
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async addNewCat(@UploadedFile() file: Express.Multer.File, @Body('request') body): Promise<InsertResult> {
    let cat: CreateCatDto = JSON.parse(body);
    cat.photoPath = file.path;
    return this.catsService.addNewCat(cat);
  }

  @Put('edit/:id')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  async editCat(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body('request') body): Promise<UpdateResult> {
    let cat: CreateCatDto = JSON.parse(body);
    if (file !== undefined) {
      cat.photoPath = file.path;
    }
    return this.catsService.editCat(id, cat);
  }

  @Delete(':id')
  async removeCat(@Param('id') id: string): Promise<void> {
    return this.catsService.removeCat(id);
  }

}
