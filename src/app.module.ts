import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesModule } from './dishes/dishes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

// Note: Database is created if it does not exist
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
        join(__dirname, '..', '.env'),
      ],
    }),
    MongooseModule.forRoot(process.env.MONGO_DSN),
    DishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
