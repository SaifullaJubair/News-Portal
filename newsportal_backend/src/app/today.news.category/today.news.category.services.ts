
import mongoose from "mongoose";
import { INewsInterface } from "../news/news.interface";
import NewsModel from "../news/news.model";
import { ITodayNewsCategoryInterface, todayNewsCategorySearchableField } from "./today.news.category.interface";
import TodayNewsCategoryModel from "./today.news.category.model";

// Find A TodayNewsCategory
export const findATodayNewsCategoryServices = async (
  category_slug: string
): Promise<ITodayNewsCategoryInterface | null> => {
  const findTodayNewsCategory: ITodayNewsCategoryInterface | null = await TodayNewsCategoryModel.findOne({
    category_slug: category_slug,
  });
  return findTodayNewsCategory;
};

// Find A TodayNewsCategory with serial
export const findATodayNewsCategorySerialServices = async (
  category_serial: number
): Promise<ITodayNewsCategoryInterface | null> => {
  const findTodayNewsCategory: ITodayNewsCategoryInterface | null = await TodayNewsCategoryModel.findOne({
    category_serial: category_serial,
  });
  return findTodayNewsCategory;
};

// Create A TodayNewsCategory
export const postTodayNewsCategoryServices = async (
  data: ITodayNewsCategoryInterface
): Promise<ITodayNewsCategoryInterface | {}> => {
  const createTodayNewsCategory: ITodayNewsCategoryInterface | {} = await TodayNewsCategoryModel.create(
    data
  );
  return createTodayNewsCategory;
};

// Find All TodayNewsCategory
export const findAllTodayNewsCategoryServices = async (): Promise<
  ITodayNewsCategoryInterface[] | any
> => {
  const today = new Date();
  const todayStr = today.toISOString().substring(0, 10);
  const startOfDay = new Date(todayStr);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const showTodatNewsCategory: ITodayNewsCategoryInterface[] | [] = await TodayNewsCategoryModel.find({ category_status: "active" }).sort({ category_serial: 1 });

  const matchedNewsByshowTodatNewsCategory = await Promise.all(
    showTodatNewsCategory?.map(async (category: any) => {
      const newsInCategory = await NewsModel.find({
        news_status: "active",
        today_news_category_id: category?._id?.toString(),
        createdAt: { $gte: startOfDay, $lt: endOfDay }
      }).populate(["category_id", "sub_category_id", "today_news_category_id"]).sort({ home_position: 1 })
      return { categoryDetails: category, news: newsInCategory };
    })
  );

  const sendData = {
    today_news_category: showTodatNewsCategory,
    news: matchedNewsByshowTodatNewsCategory
  }
  return sendData;
};

// find category match all News
export const findCategoryAllNewsServices = async (
  today_news_category_id: any
): Promise<INewsInterface[] | any> => {

  const today = new Date();
  const todayStr = today.toISOString().substring(0, 10);
  const startOfDay = new Date(todayStr);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const objectIdCategoryId: any = mongoose.Types.ObjectId.isValid(today_news_category_id) ? new mongoose.Types.ObjectId(today_news_category_id) : today_news_category_id;

  const newsInCategory = await NewsModel.aggregate([
    { $match: { today_news_category_id: objectIdCategoryId, createdAt: { $gte: startOfDay, $lt: endOfDay } } },
    { $sample: { size: 5 } },
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_id"
      }
    },
    { $unwind: { path: "$category_id", preserveNullAndEmptyArrays: true } }
  ]);

  const findNews: INewsInterface[] | any = await NewsModel.find({ today_news_category_id: objectIdCategoryId, news_status: "active", createdAt: { $gte: startOfDay, $lt: endOfDay } }).populate("category_id")
    .sort({ _id: 1 })
    .skip(0)
    .limit(10)
    .select("-__v");

  const sendData = {
    headNews: newsInCategory,
    news: findNews
  }
  return sendData;
};
// find category loadMore all News
export const findCategoryLoadMoreAllNewsServices = async (
  limit: number,
  skip: number,
  today_news_category_id: any
): Promise<INewsInterface[] | any> => {

  const today = new Date();
  const todayStr = today.toISOString().substring(0, 10);
  const startOfDay = new Date(todayStr);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const objectIdCategoryId: any = mongoose.Types.ObjectId.isValid(today_news_category_id) ? new mongoose.Types.ObjectId(today_news_category_id) : today_news_category_id;

  const findNews: INewsInterface[] | any = await NewsModel.find({ today_news_category_id: objectIdCategoryId, news_status: "active", createdAt: { $gte: startOfDay, $lt: endOfDay } }).populate("category_id")
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");

  const sendData = {
    news: findNews
  }
  return sendData;
};

// Find all dashboard TodayNewsCategory
export const findAllDashboardTodayNewsCategoryServices = async (
  limit: number,
  skip: number,
  searchTerm: any
): Promise<ITodayNewsCategoryInterface[] | []> => {
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: todayNewsCategorySearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const findTodayNewsCategory: ITodayNewsCategoryInterface[] | [] = await TodayNewsCategoryModel.find(
    whereCondition
  )
    .sort({ category_serial: 1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findTodayNewsCategory;
};

// Update a TodayNewsCategory
export const updateTodayNewsCategoryServices = async (
  data: ITodayNewsCategoryInterface,
  _id: string
): Promise<ITodayNewsCategoryInterface | any> => {
  const updateTodayNewsCategoryInfo: ITodayNewsCategoryInterface | null =
    await TodayNewsCategoryModel.findOne({ _id: _id });
  if (!updateTodayNewsCategoryInfo) {
    return {};
  }

  const TodayNewsCategory = await TodayNewsCategoryModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return TodayNewsCategory;
};

// delete a TodayNewsCategory start

// Find A TodayNewsCategory in News
export const findATodayNewsCategoryExistNewsServices = async (
  _id: string
): Promise<INewsInterface | null> => {
  const findTodayNewsCategory: INewsInterface | null = await NewsModel.findOne({
    today_news_category_id: _id,
  });
  return findTodayNewsCategory;
};

export const deleteTodayNewsCategoryServices = async (
  _id: string
): Promise<ITodayNewsCategoryInterface | any> => {
  const deleteTodayNewsCategoryInfo: ITodayNewsCategoryInterface | null =
    await TodayNewsCategoryModel.findOne({ _id: _id });
  if (!deleteTodayNewsCategoryInfo) {
    return {};
  }
  const TodayNewsCategory = await TodayNewsCategoryModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return TodayNewsCategory;
};
