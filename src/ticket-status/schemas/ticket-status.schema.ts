import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TicketStatusDocument = HydratedDocument<TicketStatus>;

@Schema()
export class TicketStatus {
  @Prop()
  name: string;
}

export const TicketStatusSchema = SchemaFactory.createForClass(TicketStatus);
