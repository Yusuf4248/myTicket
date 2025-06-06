import { Module } from "@nestjs/common";
import { VenueTypesService } from "./venue-types.service";
import { VenueTypesController } from "./venue-types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { VenueType, VenueTypesSchema } from "./schemas/venue-type.schema";
import { Venue, VenueSchema } from "../venue/schemas/venue.schema";
import { Type, TypeSchema } from "../types/schemas/type.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VenueType.name, schema: VenueTypesSchema },
      { name: Venue.name, schema: VenueSchema },
      { name: Type.name, schema: TypeSchema },
    ]),
  ],
  controllers: [VenueTypesController],
  providers: [VenueTypesService],
})
export class VenueTypesModule {}
