import { Connection, Repository } from 'typeorm';
import { Dog } from './entities/dog.entity';
import { CreateDogDto } from './dto/create-dog.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DogRepository {
  repo: Repository<Dog>;

  constructor(private connection: Connection) {
    this.repo = connection.getRepository(Dog);
  }
  dog(dogId: string): Promise<Dog> {
    return this.repo.findOne(dog_id);
  }
  dogs(): Promise<Dog[]> {
    return this.repo.find();
  }

  createDog(createDogDto: CreateDogDto): Promise<Dog> {
    const dog = this.repo.create(createDogDto);
    return dog.save();
  }

  updateDog(dog: Dog): Promise<Dog> {
    return dog.save();
  }

  deleteDog(dog: Dog) {
    return dog.remove();
  }
}
