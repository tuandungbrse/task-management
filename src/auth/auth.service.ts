import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(authCreadentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCreadentialDto);
  }

  public async signIn(
    authCreadentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCreadentialDto;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const token = this.jwtService.sign(payload);
      const accessToken = { accessToken: token };
      return accessToken;
    } else {
      throw new UnauthorizedException('');
    }
  }
}
