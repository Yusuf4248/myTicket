import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { Region } from "../../region/schemas/region.schema";
import { District } from "../../district/schemas/district.schema";

@Schema({ timestamps: true })
export class Venue extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  region_id: Region;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "District" })
  district_id: District;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
