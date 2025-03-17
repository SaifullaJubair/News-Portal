import { Schema, model } from "mongoose";
import { IRoleInterface } from "./role.interface";

// Role Schema
const roleSchema = new Schema<IRoleInterface>(
  {
    role_name: {
      required: true,
      type: String,
    },
    dashboard_show: {
      type: Boolean,
      default: false,
    },
    category_show: {
      type: Boolean,
      default: false,
    },
    category_create: {
      type: Boolean,
      default: false,
    },
    category_update: {
      type: Boolean,
      default: false,
    },
    category_delete: {
      type: Boolean,
      default: false,
    },
    sub_category_show: {
      type: Boolean,
      default: false,
    },
    sub_category_create: {
      type: Boolean,
      default: false,
    },
    sub_category_update: {
      type: Boolean,
      default: false,
    },
    sub_category_delete: {
      type: Boolean,
      default: false,
    },
    today_news_category_show: {
      type: Boolean,
      default: false,
    },
    today_news_category_create: {
      type: Boolean,
      default: false,
    },
    today_news_category_update: {
      type: Boolean,
      default: false,
    },
    today_news_category_delete: {
      type: Boolean,
      default: false,
    },
    social_media_create: {
      type: Boolean,
      default: false,
    },
    social_media_update: {
      type: Boolean,
      default: false,
    },
    social_media_delete: {
      type: Boolean,
      default: false,
    },
    ads_show: {
      type: Boolean,
      default: false,
    },
    ads_create: {
      type: Boolean,
      default: false,
    },
    ads_update: {
      type: Boolean,
      default: false,
    },
    ads_delete: {
      type: Boolean,
      default: false,
    },
    news_show: {
      type: Boolean,
      default: false,
    },
    news_create: {
      type: Boolean,
      default: false,
    },
    news_update: {
      type: Boolean,
      default: false,
    },
    news_delete: {
      type: Boolean,
      default: false,
    },
    staff_show: {
      type: Boolean,
      default: false,
    },
    staff_create: {
      type: Boolean,
      default: false,
    },
    staff_update: {
      type: Boolean,
      default: false,
    },
    staff_delete: {
      type: Boolean,
      default: false,
    },
    online_jorip_show: {
      type: Boolean,
      default: false,
    },
    online_jorip_create: {
      type: Boolean,
      default: false,
    },
    online_jorip_update: {
      type: Boolean,
      default: false,
    },
    online_jorip_delete: {
      type: Boolean,
      default: false,
    },
    staff_permission_show: {
      type: Boolean,
      default: false,
    },
    staff_permission_create: {
      type: Boolean,
      default: false,
    },
    staff_permission_update: {
      type: Boolean,
      default: false,
    },
    staff_permission_delete: {
      type: Boolean,
      default: false,
    },
    site_setting_update: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const RoleModel = model<IRoleInterface>("roles", roleSchema);

export default RoleModel;
