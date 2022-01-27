import { AfterRemove, AfterUpdate, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({unique: true})
  email: string;
  @Column()
  password: string;

  @BeforeUpdate()
  @BeforeInsert()
  async hasPassword() {
    console.log( 'insert new user')
    //this.password = await bcrypt.hashSync( this.password, 12 );
  }

  @AfterUpdate()
  async update(){
    console.log( 'update an user')
  }

  @AfterRemove()
  async remove(){
    console.log( 'remove an user')
  }

}
