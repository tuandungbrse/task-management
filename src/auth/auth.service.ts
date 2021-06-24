import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signUp(authCreadentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCreadentialDto);
  }

  public async signIn(authCreadentialDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCreadentialDto;
    const user = await this.userRepository.findOne({ username });
    if (user) {
      return 'success';
    } else {
      throw new UnauthorizedException('');
    }
  }
}
