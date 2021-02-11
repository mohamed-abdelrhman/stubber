import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogRepository } from './dog.repository';
import { Dog } from './entities/dog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  providers: [DogService, DogRepository],
  exports: [DogService],
})
export class DogModule {}
