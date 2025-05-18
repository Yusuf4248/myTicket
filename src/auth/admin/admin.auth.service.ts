import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../../admin/admin.service";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { AdminDocument } from "../../admin/schemas/admin.schema";
import { LoginDto } from "./../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async generateTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
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

  async loginAdmin(loginDto: LoginDto, res: Response) {
    const admin = await this.adminService.findByEmail(loginDto.email);
    if (!admin) {
      throw new UnauthorizedException("Password or email  invalid");
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      admin.hashshed_password
    );
    if (!validPassword) {
      throw new UnauthorizedException("Password or email  invalid");
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    admin.hashshed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    return { message: "Welcome", accessToken };
  }

  async logOutAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Ro'yxatdan o'tmagan");
    }

    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const admin = await this.adminService.findOne(decoded_token.id);
    if (!admin) {
      throw new BadRequestException("Token topilmadi");
    }

    admin.hashshed_refresh_token = "";
    await admin.save();

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

    const admin = await this.adminService.findOne(decoded_token.id);
    if (!admin) {
      throw new BadRequestException("Token topilmadi");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    admin.hashshed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

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
