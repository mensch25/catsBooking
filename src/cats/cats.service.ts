import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

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

  async removeCat(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
