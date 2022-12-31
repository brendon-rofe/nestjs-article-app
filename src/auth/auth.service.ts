import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async register(dto: RegisterDto) {
    const newUser = await this.userService.createUser({
      ...dto
    })
    return newUser;
  }
}