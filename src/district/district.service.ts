import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schemas/district.schema";
import mongoose, { Model } from "mongoose";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name)
    private readonly districtSchema: Model<District>,
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    if (mongoose.isValidObjectId(createDistrictDto.region_id))
      throw new BadRequestException("ID xato");
    const region = await this.regionSchema.findById(
      createDistrictDto.region_id
    );
    if (!region) {
      throw new BadRequestException("Bunday region yo'q");
    }
    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("region_id");
  }

  findOne(id: string) {
    return this.districtSchema.findById(id);
  }

  update(id: string, updateDistrictDto: UpdateDistrictDto) {
    return this.districtSchema.findByIdAndUpdate(id, updateDistrictDto);
  }

  remove(id: string) {
    return this.districtSchema.findByIdAndDelete(id);
  }
}
