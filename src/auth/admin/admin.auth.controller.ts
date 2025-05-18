import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { LoginDto } from "./../dto/sign-in.dto";
import { Request, Response } from "express";
import { AdminAuthService } from "./admin.auth.service";

@Controller("auth/admin")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}
  @HttpCode(200)
  @Post("login")
  async loginAdmin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.loginAdmin(loginDto, res);
  }

  @Get("logOut")
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.logOutAdmin(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.refreshToken(request, response);
  }
}
