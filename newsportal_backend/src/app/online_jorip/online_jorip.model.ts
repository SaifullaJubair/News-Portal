import { Schema, model } from "mongoose";
import { IOnlineJoripInterface } from "./online_jorip.interface";

// online jorip Schema
const onlineJoripSchema = new Schema<IOnlineJoripInterface>(
  {
    online_jorip_image: {
      required: true,
      type: String,
    },
    image_key: {
      required: true,
      type: String,
      unique: true,
    },
    social_image: {
      type: String,
    },
    social_image_key: {
      type: String,
    },
    online_jorip_status: {
      required: true,
      type: String,
      enum: ["active", "in-active"],
      default: "in-active",
    },
    online_jorip_title: {
      required: true,
      type: String,
    },
    online_jorip_all_question: [
      {
        online_jorip_question: {
          required: true,
          type: String,
        },
        online_jorip_question_click: {
          type: Number,
        },
      }
    ]
  },
  {
    timestamps: true,
  }
);

const OnlineJoripModel = model<IOnlineJoripInterface>("onlinejorips", onlineJoripSchema);

export default OnlineJoripModel;
