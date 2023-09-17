import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { LoginDto as LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "../../utils/crypto.service";

@Controller()
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post("/api/login")
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Post("/api/register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get("/api/check")
  @UseGuards(AuthGuard)
  async check() {
    return;
  }
}
