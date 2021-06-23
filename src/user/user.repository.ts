import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCreadentialDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCreadentialDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
