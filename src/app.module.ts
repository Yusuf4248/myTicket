import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { RegionModule } from "./region/region.module";
import { CustomerModule } from "./customer/customer.module";
import { DistrictModule } from "./district/district.module";
import { CustomerCardModule } from "./customer-card/customer-card.module";
import { CustomerAddressModule } from "./customer-address/customer-address.module";
import { TypesModule } from "./types/types.module";
import { VenueModule } from "./venue/venue.module";
import { SeatTypeModule } from "./seat-type/seat-type.module";
import { SeatModule } from "./seat/seat.module";
import { LangModule } from "./lang/lang.module";
import { HumanCategoryModule } from "./human-category/human-category.module";
import { EventTypeModule } from './event-type/event-type.module';
import { TicketStatusModule } from './ticket-status/ticket-status.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { DeliveryMethodModule } from './delivery-method/delivery-method.module';
import { BookingsModule } from './bookings/bookings.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CartModule } from './cart/cart.module';
import { VenuePhotoModule } from './venue-photo/venue-photo.module';
import { VenueTypesModule } from './venue-types/venue-types.module';

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
    LangModule,
    HumanCategoryModule,
    EventTypeModule,
    TicketStatusModule,
    EventModule,
    TicketModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    BookingsModule,
    CartItemModule,
    CartModule,
    VenuePhotoModule,
    VenueTypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
