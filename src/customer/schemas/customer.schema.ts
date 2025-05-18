import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  phone: string;

  @Prop()
  hashshed_password: string;

  @Prop()
  email: string;

  @Prop()
  birth_date: Date;

  @Prop()
  gender: "male" | "female";

  @Prop()
  lang_id: number;

  @Prop()
  hashshed_refresh_token: string;

  @Prop({ default: false })
  is_active: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
