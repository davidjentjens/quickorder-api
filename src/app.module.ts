import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesModule } from './dishes/dishes.module';
import { MongooseModule } from '@nestjs/mongoose';

// Note: Database is created if it does not exist
const uri = "mongodb://root:root@db:27017/dishes?authSource=admin"

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    DishesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
