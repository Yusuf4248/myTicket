import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { CustomerAuthService } from "./customer.auth.service";
import { LoginDto } from "../dto/sign-in.dto";
import { Request, Response } from "express";
import { CreateCustomerDto } from "../../customer/dto/create-customer.dto";

@Controller("auth/customer")
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post("logUp")
  async logUpCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerAuthService.logUpCustomer(createCustomerDto);
  }

  @HttpCode(200)
  @Post("login")
  async loginAdmin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.customerAuthService.loginCustomer(loginDto, res);
  }

  @Get("logOut")
  logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.customerAuthService.logOutCustomer(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.customerAuthService.refreshToken(request, response);
  }
}
