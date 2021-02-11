import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { GetDogDto } from './dto/get-dog.dto';
import { DeleteDogDto } from './dto/delete-dog.dto';

@Controller()
export class DogController {
  constructor(private dogService: DogService) {}
  // define message pattern for this service
  @MessagePattern('createDog')
  async createDog(createDogDto: CreateDogDto) {
    return this.dogService.createDog(createDogDto);
  }

  // define message pattern for this service
  @MessagePattern('updateDog')
  async updateDog(updateDog: UpdateDogDto) {
    return this.dogService.updateDog(updateDog);
  }

  // define message pattern for this service
  @MessagePattern('dog')
  async dog(getDogDto: GetDogDto) {
    return this.dogService.dog(getDogDto.dog_id);
  }
    // define message pattern for this service
    @MessagePattern('dogs')
    async dogs() {
      return this.dogService.dogs();
    }

  // define message pattern for this service
  @MessagePattern('deleteDog')
  async deleteDog(deleteDogDto: DeleteDogDto) {
    return this.dogService.deleteDog(deleteDogDto.dog_id);
  }
}
