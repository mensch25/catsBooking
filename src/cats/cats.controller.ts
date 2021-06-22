import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Cat } from './cat.entity';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getAllCats(): Promise<Cat[]> {
    return this.catsService.getAllCats();
  }

  @Get(':id')
  async getCat(@Param('id') id: string): Promise<Cat> {
    return this.catsService.getCat(id);
  }

  @Delete(':id')
  async removeCat(@Param('id') id: string): Promise<void> {
    return this.catsService.removeCat(id);
  }

}
