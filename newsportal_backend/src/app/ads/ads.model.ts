import { Schema, model } from "mongoose";
import { IAdsInterface } from "./ads.interface";

// Ads Schema
const adsSchema = new Schema<IAdsInterface>(
  {
    ads_image: {
      required: true,
      type: String,
    },
    image_key: {
      required: true,
      type: String,
      unique: true,
    },
    ads_link: {
      required: true,
      type: String,
    },
    ads_serial: {
      required: true,
      type: Number,
    },
    ads_status: {
      required: true,
      type: String,
      enum: ["active", "in-active"],
      default: "in-active",
    },
  },
  {
    timestamps: true,
  }
);

const AdsModel = model<IAdsInterface>("ads", adsSchema);

export default AdsModel;
