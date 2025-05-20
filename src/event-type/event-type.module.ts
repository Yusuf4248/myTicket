import { Module } from "@nestjs/common";
import { EventTypeService } from "./event-type.service";
import { EventTypeController } from "./event-type.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EventType, EventTypeSchema } from "./shemas/event-type.schemas";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventType.name, schema: EventTypeSchema },
    ]),
  ],
  controllers: [EventTypeController],
  providers: [EventTypeService],
  exports:[EventTypeService]
})
export class EventTypeModule {}
