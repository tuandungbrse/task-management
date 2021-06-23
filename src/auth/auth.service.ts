import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(authCreadentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCreadentialDto);
  }
}
