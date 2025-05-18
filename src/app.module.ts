import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { CustomerModule } from './customer/customer.module';
import { DistrictModule } from './district/district.module';
import { CustomerCardModule } from './customer-card/customer-card.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { TypesModule } from './types/types.module';
import { VenueModule } from './venue/venue.module';
import { SeatTypeModule } from './seat-type/seat-type.module';
import { SeatModule } from './seat/seat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    RegionModule,
    CustomerModule,
    DistrictModule,
    CustomerCardModule,
    CustomerAddressModule,
    TypesModule,
    VenueModule,
    SeatTypeModule,
    SeatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
