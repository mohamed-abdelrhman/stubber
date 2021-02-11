import { BaseEntity, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dog')
export class Dog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  dog_id: string;
}
