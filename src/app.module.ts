import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'catuser',
      password: 'catpass',
      database: 'catsdb',
      entities: [Cat],
      synchronize: true,
    }),
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
