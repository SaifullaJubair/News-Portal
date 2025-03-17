import { Schema, model } from "mongoose";
import { ITodayNewsCategoryInterface } from "./today.news.category.interface";

// Today News Category Schema
const todayNewsCategorySchema = new Schema<ITodayNewsCategoryInterface>(
  {
    category_name: {
      required: true,
      type: String,
      unique: true,
    },
    category_slug: {
      required: true,
      type: String,
      unique: true,
    },
    category_status: {
      required: true,
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
    category_serial: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodayNewsCategoryModel = model<ITodayNewsCategoryInterface>("todaynewscategories", todayNewsCategorySchema);

export default TodayNewsCategoryModel;
