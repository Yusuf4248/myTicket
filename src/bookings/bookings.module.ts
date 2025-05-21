import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "../cart/schemas/cart.schema";
import {
  PaymentMethod,
  PaymentMethodSchema,
} from "../payment-method/schemas/payment-method.schema";
import {
  DeliveryMethod,
  DeliveryMethodSchema,
} from "../delivery-method/schemas/delivery-method.schema";
import { CartModule } from "../cart/cart.module";
import { DeliveryMethodModule } from "../delivery-method/delivery-method.module";
import { PaymentMethodModule } from "../payment-method/payment-method.module";
import { Booking, BookingSchema } from "./schemas/booking.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Cart.name, schema: CartSchema },
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
      { name: DeliveryMethod.name, schema: DeliveryMethodSchema },
    ]),
    CartModule,
    DeliveryMethodModule,
    PaymentMethodModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
