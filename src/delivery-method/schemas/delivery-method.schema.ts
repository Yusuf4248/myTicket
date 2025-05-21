import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DeliveryMethodMethodDocument = HydratedDocument<DeliveryMethod>;

@Schema()
export class DeliveryMethod {
  @Prop()
  name: string;
}

export const DeliveryMethodSchema =
  SchemaFactory.createForClass(DeliveryMethod);
