import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  
}