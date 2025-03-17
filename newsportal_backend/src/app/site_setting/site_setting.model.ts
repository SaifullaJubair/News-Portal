import { Schema, model } from "mongoose";
import { ISiteSettingInterface } from "./site_setting.interface";

// site setting Schema
const site_settingSchema = new Schema<ISiteSettingInterface>(
  {
    logo: {
      type: String,
    },
    favicon: {
      type: String,
    },
    title: {
      type: String,
    },
    emergency_contact: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    you_tube: {
      type: String,
    },
    watsapp: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    about_us: {
      type: String,
    },
    privacy_policy: {
      type: String,
    },
    terms_condition: {
      type: String,
    },
    advertisement: {
      type: String,
    },
    cover_photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettingModel = model<ISiteSettingInterface>(
  "settings",
  site_settingSchema
);

export default SiteSettingModel;
