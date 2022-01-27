import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Reports')
export class ReportEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  price: number;

 }
