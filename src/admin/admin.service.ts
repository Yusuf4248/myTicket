import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminSchema: Model<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email } = createAdminDto;
    const admin = await this.adminSchema.findOne({ email });
    if (admin) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    if (password != confirm_password) {
      throw new BadRequestException(
        "Password va confirm password bir xil bo'lishi kerak"
      );
    }
    const hashshed_password = await bcrypt.hash(password, 7);
    return this.adminSchema.create({ ...createAdminDto, hashshed_password });
  }

  async findByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  async findAll() {
    const admin = await this.adminSchema.find();
    if (admin.length == 0) {
      throw new BadRequestException("Admin not found!");
    }
    return admin;
  }

  async findOne(id: string) {
    const admin = await this.adminSchema.findById(id);
    if (!admin) {
      throw new BadRequestException(`Cannot find admin  with this ${id}`);
    }
    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    await admin.updateOne(updateAdminDto);
    return admin;
  }

  async remove(id: string) {
    const admin = await this.findOne(id);
    await admin.deleteOne();
    return { message: "Admin deleted" };
  }
}
