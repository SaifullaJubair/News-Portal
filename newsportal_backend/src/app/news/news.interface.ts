import { Types } from "mongoose";
import { ICategoryInterface } from "../category/category.interface";
import { ISub_CategoryInterface } from "../sub_category/sub_category.interface";
import { ITodayNewsCategoryInterface } from "../today.news.category/today.news.category.interface";
import { IUserInterface } from "../user.reg/user.interface";

interface IMetaKeywords {
  keyword: string;
}

export interface INewsInterface {
  _id?: any;
  category_id: Types.ObjectId | ICategoryInterface;
  sub_category_id?: Types.ObjectId | ISub_CategoryInterface;
  publisher_user_id: Types.ObjectId | IUserInterface;
  updated_user_id?: Types.ObjectId | IUserInterface;
  division?: string;
  district?: string;
  home_position: number;
  heading: string;
  sub_heading?: string;
  description?: string;
  main_image?: string;
  main_image_source?: string;
  image_key?: string;
  social_image?: string;
  social_image_key?: string;
  audio_link?: string;
  audio_key?: string;
  video_link?: string;
  news_click?: number;
  today_news?: true | false;
  today_news_category_id?: Types.ObjectId | ITodayNewsCategoryInterface;
  special_news?: true | false;
  special_news_serial?: number;
  breaking_news?: true | false;
  breaking_serial?: number;
  feature_news?: true | false;
  feature_serial?: number;
  latest_news?: true | false;
  latest_serial?: number;
  top_news?: true | false;
  top_serial?: number;
  writer_name?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keyword?: IMetaKeywords[];
  news_status: "active" | "in-active";
  writer_image?: string;
  writer_image_key?: string;
}

export const newsSearchableField = [
  "heading",
  "division",
  "district",
  "writer_name",
  "meta_title",
  "meta_description"
];
