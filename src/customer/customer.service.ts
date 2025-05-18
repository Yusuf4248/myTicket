import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerSchema: Model<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const { confirm_password, password } = createCustomerDto;
    if (confirm_password !== password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashshed_password = await bcrypt.hash(password, 7);
    return this.customerSchema.create({
      ...createCustomerDto,
      hashshed_password,
    });
  }

  async findByEmail(email: string) {
    return this.customerSchema.findOne({ email });
  }

  async findAll() {
    const customer = await this.customerSchema.find();
    if (customer.length == 0) {
      throw new BadRequestException("customer not found!");
    }
    return customer;
  }

  async findOne(id: string) {
    const customer = await this.customerSchema.findById(id);
    if (!customer) {
      throw new BadRequestException(`Cannot find customer  with this ${id}`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    await customer.updateOne(updateCustomerDto);
    return customer;
  }

  async remove(id: string) {
    const customer = await this.findOne(id);
    await customer.deleteOne();
    return { message: "customer deleted" };
  }
}
