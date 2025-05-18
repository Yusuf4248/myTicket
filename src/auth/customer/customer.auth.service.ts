import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CustomerService } from "../../customer/customer.service";
import { CustomerDocument } from "../../customer/schemas/customer.schema";
import { LoginDto } from "../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CreateCustomerDto } from "../../customer/dto/create-customer.dto";

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  async logUpCustomer(createCustomerDto: CreateCustomerDto) {
    const candidate = await this.customerService.findByEmail(
      createCustomerDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday emailli foydalanuvchi mavjud");
    }
    const newCustomer = await this.customerService.create(createCustomerDto);
    return { message: "Foydalanuvchi qo'shildi" };
  }

  async generateTokens(customer: CustomerDocument) {
    const payload = {
      id: customer._id,
      email: customer.email,
      is_active: customer.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async loginCustomer(loginDto: LoginDto, res: Response) {
    const customer = await this.customerService.findByEmail(loginDto.email);
    if (!customer) {
      throw new UnauthorizedException("Password or email  invalid");
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      customer.hashshed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Password or email  invalid");
    }
    const { accessToken, refreshToken } = await this.generateTokens(customer);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    customer.hashshed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await customer.save();

    return { message: "Welcome", accessToken };
  }

  async logOutCustomer(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const customer = await this.customerService.findOne(decoded_token.id);
    if (!customer) {
      throw new BadRequestException("Token topilmadi");
    }

    customer.hashshed_refresh_token = "";
    await customer.save();

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }

  async refreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }
    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const customer = await this.customerService.findOne(decoded_token.id);
    if (!customer) {
      throw new BadRequestException("Token topilmadi");
    }

    const { accessToken, refreshToken } = await this.generateTokens(customer);

    customer.hashshed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await customer.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return {
      success: true,
      message: "Tokenlar yangilandi!",
      access_token: accessToken,
    };
  }
}
