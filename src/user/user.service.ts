import { Injectable } from "@nestjs/common";
import { LoginDto } from "src/auth/dto/login.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        ...dto
      }
    });
    return newUser;
  }

  async getUserByEmail(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    return user;
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}