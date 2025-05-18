import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "./schemas/region.schema";
import { Model } from "mongoose";

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>
  ) {}
  create(createRegionDto: CreateRegionDto) {
    return this.regionSchema.create(createRegionDto);
  }

  async findAll() {
    const region = await this.regionSchema.find().populate("districts");
    if (region.length == 0) {
      throw new BadRequestException("Region not found!");
    }
    return region;
  }

  async findOne(id: string) {
    const region = await this.regionSchema.findById(id);
    if (!region) {
      throw new BadRequestException(`Cannot find region with this ${id}`);
    }
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const region = await this.findOne(id);
    await region.updateOne(updateRegionDto);
    return region;
  }

  async remove(id: string) {
    const region = await this.findOne(id);
    await region.deleteOne();
    return { message: "region deleted" };
  }
}
