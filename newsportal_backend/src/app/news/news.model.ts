import { Schema, model } from "mongoose";
import { INewsInterface } from "./news.interface";

// News Schema
const newsSchema = new Schema<INewsInterface>(
  {
    division: {
      type: String,
    },
    district: {
      type: String,
    },
    home_position: {
      required: true,
      type: Number,
    },
    heading: {
      required: true,
      type: String,
    },
    sub_heading: {
      type: String,
    },
    description: {
      type: String,
    },
    main_image: {
      type: String,
    },
    image_key: {
      type: String,
    },
    social_image: {
      type: String,
    },
    social_image_key: {
      type: String,
    },
    audio_link: {
      type: String,
    },
    audio_key: {
      type: String,
    },
    video_link: {
      type: String,
    },
    news_click: {
      type: Number,
      default: 0,
    },
    today_news: {
      type: Boolean,
      default: false,
    },
    today_news_category_id: {
      type: Schema.Types.ObjectId,
      ref: "todaynewscategories",
    },
    special_news: {
      type: Boolean,
      default: false,
    },
    special_news_serial: {
      type: Number,
      default: 0,
    },
    breaking_news: {
      type: Boolean,
      default: false,
    },
    breaking_serial: {
      type: Number,
      default: 0,
    },
    feature_news: {
      type: Boolean,
      default: false,
    },
    feature_serial: {
      type: Number,
      default: 0,
    },
    latest_news: {
      type: Boolean,
      default: false,
    },
    latest_serial: {
      type: Number,
      default: 0,
    },
    top_news: {
      type: Boolean,
      default: false,
    },
    top_serial: {
      type: Number,
      default: 0,
    },
    writer_name: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    meta_keyword: [
      {
        keyword: String,
      },
    ],
    news_status: {
      required: true,
      type: String,
      enum: ["active", "in-active"],
      default: "active",
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    sub_category_id: {
      type: Schema.Types.ObjectId,
      ref: "subcategories",
    },
    publisher_user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    updated_user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    writer_image: {
      type: String,
    },
    writer_image_key: {
      type: String,
    },
    main_image_source: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const NewsModel = model<INewsInterface>("news", newsSchema);

export default NewsModel;
