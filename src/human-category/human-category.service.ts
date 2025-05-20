import { Injectable } from "@nestjs/common";
import { CreateHumanCategoryDto } from "./dto/create-human-category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { HumanCategory } from "./schemas/human-category.schema";
import { Model } from "mongoose";

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory.name)
    private readonly humanCateforySchema: Model<HumanCategory>
  ) {}
  create(createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCateforySchema.create(createHumanCategoryDto);
  }

  findAll() {
    return this.humanCateforySchema.find();
  }

  findOne(id: string) {
    return this.humanCateforySchema.findById(id);
  }

  update(id: string, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    return this.humanCateforySchema.findByIdAndUpdate(
      id,
      updateHumanCategoryDto
    );
  }

  remove(id: string) {
    return this.humanCateforySchema.findByIdAndDelete(id);
  }
}
