import { Module } from "@nestjs/common";
import { CustomerAddressService } from "./customer-address.service";
import { CustomerAddressController } from "./customer-address.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CustomerAddress,
  CustomerAddressSchema,
} from "./schemas/customer-address.schema";
import { Region, RegionSchema } from "../region/schemas/region.schema";
import { Customer, CustomerSchema } from "../customer/schemas/customer.schema";
import { District, DistrictSchema } from "../district/schemas/district.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerAddress.name, schema: CustomerAddressSchema },
      { name: Region.name, schema: RegionSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: District.name, schema: DistrictSchema },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
