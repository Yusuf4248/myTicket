import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer-address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer-address.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerAddress } from "./schemas/customer-address.schema";
import { isValidObjectId, Model } from "mongoose";
import { Customer } from "../customer/schemas/customer.schema";
import { Region } from "../region/schemas/region.schema";
import { District } from "../district/schemas/district.schema";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private readonly customerAddressSchema: Model<CustomerAddress>,
    @InjectModel(Customer.name)
    private readonly customerSchema: Model<Customer>,
    @InjectModel(Region.name)
    private readonly regionSchema: Model<Region>,
    @InjectModel(District.name)
    private readonly districtSchema: Model<District>
  ) {}
  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    if (
      !isValidObjectId(createCustomerAddressDto.customer_id) &&
      !isValidObjectId(createCustomerAddressDto.district_id) &&
      !isValidObjectId(createCustomerAddressDto.region_id)
    )
      throw new BadRequestException("ID xato");
    const customer = await this.customerSchema.findById(
      createCustomerAddressDto.customer_id
    );
    if (!customer)
      throw new BadRequestException("Customer not found. Check id");

    const region = await this.regionSchema.findById(
      createCustomerAddressDto.region_id
    );
    if (!region) throw new BadRequestException("Region not found. Check id");

    const district = await this.districtSchema.findById(
      createCustomerAddressDto.district_id
    );
    if (!district)
      throw new BadRequestException("District not found. Check id");
    const customerAddress = await this.customerAddressSchema.create(
      createCustomerAddressDto
    );
    return customerAddress;
  }

  findAll() {
    return this.customerAddressSchema
      .find()
      .populate([
        { path: "customer_id" },
        { path: "region_id" },
        { path: "district_id" },
      ]);
  }

  findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("ID xato");
    return this.customerAddressSchema.findById(id);
  }

  update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("ID xato");
    return this.customerAddressSchema.findByIdAndUpdate(
      id,
      updateCustomerAddressDto
    );
  }

  remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("ID xato");
    return this.customerAddressSchema.findByIdAndDelete(id);
  }
}
