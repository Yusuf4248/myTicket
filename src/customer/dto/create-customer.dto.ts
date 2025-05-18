export class CreateCustomerDto {
  first_name: string;

  last_name: string;

  phone: string;

  password: string;

  confirm_password: string;

  email: string;

  birth_date: Date;

  gender: "male" | "female";

  lang_id: number;

  hashshed_refresh_token: string;
}
