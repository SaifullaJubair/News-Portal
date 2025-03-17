import { Schema, model } from "mongoose";
import { IUserInterface } from "./user.interface";

// UserSchema
const userSchema = new Schema<IUserInterface>(
  {
    user_name: {
      required: true,
      type: String,
    },
    user_phone: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
    },
    user_password: {
      type: String,
    },
    division: {
      type: String,
    },
    district: {
      type: String,
    },
    user_description: {
      type: String,
    },
    user_id: {
      type: Number,
    },
    user_status: {
      required: true,
      type: String,
      enum: ["active", "in-active"],
      default: "in-active",
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    user_image: {
      type: String,
    },
    joining_date: {
      type: String,
    },
    reference_number: {
      type: String,
    },
    user_address: {
      type: String,
    },
    user_designation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUserInterface>(
  "users",
  userSchema
);

export default UserModel;
