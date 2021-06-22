import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  photoPath: string;

  @Column({ default: false })
  isBooked: boolean;
}
