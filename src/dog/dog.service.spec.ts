import { Test } from '@nestjs/testing';
import { DogRepository } from './dog.repository';
import { DogService } from './dog.service';
const mockDogRepository = () => ({});
describe('DogService', () => {
  let service;
  let repo;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DogService,
        { provide: DogRepository, useFactory: mockDogRepository },
      ],
    }).compile();
    service = module.get<DogService>(DogService);
    repo = module.get<DogRepository>(DogRepository);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});
