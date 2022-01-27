import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@models/user.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {}
