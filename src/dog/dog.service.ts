import { Injectable, NotFoundException } from '@nestjs/common';
import { DogRepository } from './dog.repository';
import { Dog } from './entities/dog.entity';
import { UpdateDogDto } from './dto/update-dog.dto';
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class DogService {
  constructor(private dogRepository: DogRepository) {}
  async dog(dog_id: string): Promise<Dog> {
    const dog = await this.dogRepository.dog(dog_id);
    if (!dog) throw new NotFoundException();
    return dog;
  }

  dogs(): Promise<Dog[]> {
    return this.dogRepository.dogs();
  }
  createDog(createDogDto: CreateDogDto): Promise<Dog> {
    return this.dogRepository.createDog(createDogDto);
  }

  async updateDog(
    updateDogDto: UpdateDogDto,
  ): Promise<Dog> {
    const dog = await this.dog(updateDogDto.dog_id);
    delete updateDogDto.dog_id;
    for (const key in updateDogDto) {
      dog[key] = updateDogDto[key];
    }
    return this.dogRepository.updateDog(dog);
  }

  async deleteDog(dog_id: string) {
    const dog = await this.dog(dog_id);
    await this.dogRepository.deleteDog(dog);
  }
}
