import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerCardDto } from "./dto/create-customer-card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer-card.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerCard } from "./schemas/customer-card.schema";
import { Model } from "mongoose";
import mongoose from "mongoose";
import { Customer } from "../customer/schemas/customer.schema";

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private readonly customerCardSchema: Model<CustomerCard>,
    @InjectModel(Customer.name) private readonly customerSchema: Model<Customer>
  ) {}
  async create(createCustomerCardDto: CreateCustomerCardDto) {
    if (!mongoose.isValidObjectId(createCustomerCardDto.customer_id))
      throw new BadRequestException("ID xato");
    const customer = await this.customerSchema.findById(
      createCustomerCardDto.customer_id
    );
    if (!customer)
      throw new BadRequestException("Customer not found. Check id");
    const customerCard = await this.customerCardSchema.create(
      createCustomerCardDto
    );
    return customerCard;
  }

  findAll() {
    return this.customerCardSchema.find().populate("customer_id");
  }

  findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("ID xato");
    return this.customerCardSchema.findById(id);
  }

  update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("ID xato");
    return this.customerCardSchema.findByIdAndUpdate(id, updateCustomerCardDto);
  }

  remove(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException("ID xato");
    return this.customerCardSchema.findByIdAndDelete(id);
  }
}
