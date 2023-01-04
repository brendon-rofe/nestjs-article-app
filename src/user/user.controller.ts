import { Body, Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserByEmail(@Body() email: any) {
    return this.userService.getUserByEmail(email)
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}