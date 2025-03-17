import { Types } from "mongoose";
import { IRoleInterface } from "../role/role.interface";

export interface IUserInterface {
  _id?: any;
  user_name: string;
  user_phone: string;
  user_email?: string;
  user_password?: string;
  division?: string;
  district?: string;
  user_description?: string;
  user_id?: number;
  user_status: "active" | "in-active";
  role_id: Types.ObjectId | IRoleInterface;
  user_image?: string;
  joining_date?: string;
  reference_number?: string;
  user_address?: string;
  user_designation?: string;
}

export const userSearchableField = [
  "user_name",
  "user_phone",
  "user_email",
  "division",
  "district",
  "user_status",
  "user_designation"
];
