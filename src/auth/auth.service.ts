import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userService.createUser({
      ...dto,
      password: hashedPassword
    });
    return newUser;
  }

  public async getAuthenticatedUser(dto: LoginDto, plainTextPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(dto);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch {
      throw new HttpException('Wring credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided',
      HttpStatus.BAD_REQUEST
      );
    }
  }
}