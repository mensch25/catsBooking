import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Cat } from './cat.entity';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}  

  getAllCats(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  getCat(id: string): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  async getPage(page: number, limit: number = 5): Promise<Cat[]> {
    return this.catsRepository
              .createQueryBuilder()
              .offset(page * limit)
              .limit(limit)
              .getMany();
  }

  getBookedCats(): Promise<Cat[]> {
    return this.catsRepository.find({ where : {isBooked: true}});
  }

  getAvailableCats(): Promise<Cat[]> {
    return this.catsRepository.find({ where : {isBooked: false}});
  }

  async bookCat(catId: string): Promise<UpdateResult> {
    return this.catsRepository
        .createQueryBuilder()
        .update(Cat)
        .set({ isBooked: true })
        .where("id = :id", {id: catId})
        .execute();
  }

  async addNewCat(cat: CreateCatDto): Promise<InsertResult> {
    return this.catsRepository
                .createQueryBuilder()
                .insert() 
                .into(Cat)
                .values(cat)
                .execute();
  }

  async editCat(catId: string, cat: CreateCatDto): Promise<UpdateResult> {
    return this.catsRepository
                .createQueryBuilder()
                .update(Cat)
                .set(cat)
                .where("id = :id", {id: catId})
                .execute();
  }

  async removeCat(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
function id(id: any, catId: string) {
    throw new Error('Function not implemented.');
}

