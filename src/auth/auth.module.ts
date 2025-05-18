import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "../admin/admin.module";
import { AdminAuthController } from "./admin/admin.auth.controller";
import { AdminAuthService } from "./admin/admin.auth.service";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
})
export class AuthModule {}