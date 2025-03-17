import mongoose, { Types } from "mongoose";
import { ICategoryInterface } from "../category/category.interface";
import CategoryModel from "../category/category.model";
import { INewsInterface, newsSearchableField } from "./news.interface";
import NewsModel from "./news.model";
import { ISub_CategoryInterface } from "../sub_category/sub_category.interface";
import Sub_CategoryModel from "../sub_category/sub_category.model";
import { ITodayNewsCategoryInterface } from "../today.news.category/today.news.category.interface";
import TodayNewsCategoryModel from "../today.news.category/today.news.category.model";

// Create A News
export const postNewsServices = async (
  data: INewsInterface
): Promise<INewsInterface | {}> => {
  const createNews: INewsInterface | {} = await NewsModel.create(data);
  return createNews;
};

// Find special category news
export const findAllSpecialCategoryNewsServices = async (): Promise<
  INewsInterface[] | any
> => {
  const specialCategory: ICategoryInterface[] | [] = await CategoryModel.find({
    special_category: true,
  }).sort({ special_category_serial: 1 });
  const matchedNewsByspecialCategory = await Promise.all(
    specialCategory?.map(async (category: any) => {
      const totalNews: INewsInterface[] | any = [];
      let home_position: number | any = 1;

      while (home_position <= 10) {
        const newsInCategory = await NewsModel.findOne({
          news_status: "active",
          category_id: category?._id?.toString(),
          home_position: home_position,
        }).sort({ _id: -1 });
        // If a news item is found, add it to the totalNews array
        if (newsInCategory) {
          totalNews.push(newsInCategory);
        }

        home_position++;
      }

      return { categoryDetails: category, news: totalNews };
    })
  );

  return matchedNewsByspecialCategory;
};

// Find ShowCard category news
export const findAllShowCardCategoryNewsServices = async (): Promise<
  INewsInterface[] | any
> => {
  const showCardCategory: ICategoryInterface[] | [] = await CategoryModel.find({
    show_card: "active",
    category_status: "active",
  }).sort({ category_serial: 1 });
  const matchedNewsByshowCardCategory = await Promise.all(
    showCardCategory?.map(async (category: any) => {
      const totalNews: INewsInterface[] = [];
      let home_position: number | any = 1;

      while (home_position <= 10) {
        const newsInCategory = await NewsModel.findOne({
          news_status: "active",
          category_id: category?._id?.toString(),
          home_position: home_position,
        }).sort({ _id: -1 });
        // If a news item is found, add it to the totalNews array
        if (newsInCategory) {
          totalNews.push(newsInCategory);
        }

        home_position++;
      }

      return { categoryDetails: category, news: totalNews };
    })
  );

  return matchedNewsByshowCardCategory;
};

// find all Breaking News
export const findAllBreakingNewsServices = async (): Promise<
  INewsInterface[] | {}
> => {
  const today = new Date();
  const todayStr = today.toISOString().substring(0, 10);
  const startOfDay = new Date(todayStr);
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const findNews: INewsInterface[] | {} = await NewsModel.aggregate([
    {
      $match: {
        breaking_news: true,
        news_status: "active",
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      },
    },
    {
      $lookup: {
        from: "categories", // The name of the category collection
        localField: "category_id",
        foreignField: "_id",
        as: "category_info",
      },
    },
    {
      $unwind: "$category_info",
    },
    {
      $lookup: {
        from: "subcategories", // The name of the subcategory collection
        localField: "sub_category_id",
        foreignField: "_id",
        as: "subcategory_info",
      },
    },
    {
      $unwind: {
        path: "$subcategory_info",
        preserveNullAndEmptyArrays: true, // In case some documents do not have a sub_category_id
      },
    },
    {
      $match: {
        "category_info.category_status": "active",
        $or: [
          { "subcategory_info.sub_category_status": "active" },
          { subcategory_info: { $exists: false } }, // In case sub_category_id is not present
        ],
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        __v: 0,
        "category_info.__v": 0,
        "subcategory_info.__v": 0,
      },
    },
  ]);

  return findNews;
};

// find all feature news
export const findAllFeatureNewsServices = async (): Promise<
  INewsInterface[]
> => {
  const totalNews: INewsInterface[] = [];
  let feature_serial: number = 1;

  while (feature_serial <= 10) {
    const findNews = await NewsModel.aggregate([
      {
        $match: {
          feature_news: true,
          news_status: "active",
          feature_serial: feature_serial,
        },
      },
      {
        $lookup: {
          from: "categories", // The name of the category collection
          localField: "category_id",
          foreignField: "_id",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
      {
        $lookup: {
          from: "subcategories", // The name of the subcategory collection
          localField: "sub_category_id",
          foreignField: "_id",
          as: "subcategory_info",
        },
      },
      {
        $unwind: {
          path: "$subcategory_info",
          preserveNullAndEmptyArrays: true, // In case some documents do not have a sub_category_id
        },
      },
      {
        $match: {
          "category_info.category_status": "active",
          $or: [
            { "subcategory_info.sub_category_status": "active" },
            { subcategory_info: { $exists: false } }, // In case sub_category_id is not present
          ],
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by creation date in descending order
      },
      {
        $limit: 1, // Limit the result to a single news item
      },
      {
        $project: {
          __v: 0,
          "category_info.__v": 0,
          "subcategory_info.__v": 0,
        },
      },
    ]);

    // If a news item is found, add it to the totalNews array
    if (findNews.length > 0) {
      totalNews.push(findNews[0]);
    }

    feature_serial++;
  }

  return totalNews;
};

// find all Latest news
export const findAllLatestNewsServices = async (): Promise<
  INewsInterface[] | {}
> => {
  const totalNews: INewsInterface[] = [];
  let latest_serial: number = 1;

  while (latest_serial <= 10) {
    const findNews = await NewsModel.aggregate([
      {
        $match: {
          latest_news: true,
          news_status: "active",
          latest_serial: latest_serial,
        },
      },
      {
        $lookup: {
          from: "categories", // The name of the category collection
          localField: "category_id",
          foreignField: "_id",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
      {
        $lookup: {
          from: "subcategories", // The name of the subcategory collection
          localField: "sub_category_id",
          foreignField: "_id",
          as: "subcategory_info",
        },
      },
      {
        $unwind: {
          path: "$subcategory_info",
          preserveNullAndEmptyArrays: true, // In case some documents do not have a sub_category_id
        },
      },
      // {
      //   $match: {
      //     "category_info.category_status": "active",
      //     $or: [
      //       { "subcategory_info.sub_category_status": "active" },
      //       { subcategory_info: { $exists: false } }, // In case sub_category_id is not present
      //     ],
      //   },
      // },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          __v: 0,
          "category_info.__v": 0,
          "subcategory_info.__v": 0,
        },
      },
    ]);

    // If a news item is found, add it to the totalNews array
    if (findNews.length > 0) {
      totalNews.push(findNews[0]);
    }

    latest_serial++;
  }

  return totalNews;
};

// find all Top news
export const findAllTopNewsServices = async (): Promise<INewsInterface[]> => {
  const totalNews: INewsInterface[] = [];
  let top_serial = 1;

  while (top_serial <= 5) {
    const findNews = await NewsModel.aggregate([
      {
        $match: {
          top_news: true,
          news_status: "active",
          top_serial: top_serial, // Ensure this matches the correct field type
        },
      },
      {
        $lookup: {
          from: "categories", // The name of the category collection
          localField: "category_id",
          foreignField: "_id",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
      {
        $lookup: {
          from: "subcategories", // The name of the subcategory collection
          localField: "sub_category_id",
          foreignField: "_id",
          as: "subcategory_info",
        },
      },
      {
        $unwind: {
          path: "$subcategory_info",
          preserveNullAndEmptyArrays: true, // In case some documents do not have a sub_category_id
        },
      },
      {
        $match: {
          "category_info.category_status": "active",
          $or: [
            { "subcategory_info.sub_category_status": "active" },
            { subcategory_info: { $exists: false } }, // In case sub_category_id is not present
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          __v: 0,
          "category_info.__v": 0,
          "subcategory_info.__v": 0,
        },
      },
    ]);

    // If a news item is found, add it to the totalNews array
    if (findNews.length > 0) {
      totalNews.push(findNews[0]);
    }

    top_serial++;
  }

  return totalNews;
};

// find all Special news
export const findAllSpecialNewsServices = async (): Promise<
  INewsInterface[] | {}
> => {
  const findNews: INewsInterface[] | {} = await NewsModel.aggregate([
    {
      $match: {
        special_news: true,
        news_status: "active",
      },
    },
    {
      $lookup: {
        from: "categories", // The name of the category collection
        localField: "category_id",
        foreignField: "_id",
        as: "category_info",
      },
    },
    {
      $unwind: "$category_info",
    },
    {
      $lookup: {
        from: "subcategories", // The name of the subcategory collection
        localField: "sub_category_id",
        foreignField: "_id",
        as: "subcategory_info",
      },
    },
    {
      $unwind: {
        path: "$subcategory_info",
        preserveNullAndEmptyArrays: true, // In case some documents do not have a sub_category_id
      },
    },
    {
      $match: {
        "category_info.category_status": "active",
        $or: [
          { "subcategory_info.sub_category_status": "active" },
          { subcategory_info: { $exists: false } }, // In case sub_category_id is not present
        ],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 20,
    },
    {
      $sort: { special_news_serial: 1 }, // Sort by special_news_serial in ascending order
    },
    {
      $project: {
        __v: 0,
        "category_info.__v": 0,
        "subcategory_info.__v": 0,
      },
    },
  ]);

  return findNews;
};

// find all LatestCreate news
export const findAllLatestCreateNewsServices = async (): Promise<
  INewsInterface[] | {}
> => {
  const findNews: INewsInterface[] | {} = await NewsModel.aggregate([
    {
      $match: {
        news_status: "active",
      },
    },
    {
      $lookup: {
        from: "categories", // The name of the category collection
        localField: "category_id",
        foreignField: "_id",
        as: "category_info",
      },
    },
    {
      $unwind: "$category_info",
    },
    {
      $lookup: {
        from: "subcategories", // The name of the subcategory collection
        localField: "sub_category_id",
        foreignField: "_id",
        as: "subcategory_info",
      },
    },
    {
      $unwind: {
        path: "$subcategory_info",
        preserveNullAndEmptyArrays: true, // In case some documents do not have a sub_category_id
      },
    },
    {
      $match: {
        "category_info.category_status": "active",
        $or: [
          { "subcategory_info.sub_category_status": "active" },
          { subcategory_info: { $exists: false } }, // In case sub_category_id is not present
        ],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 20,
    },
    {
      $project: {
        __v: 0,
        "category_info.__v": 0,
        "subcategory_info.__v": 0,
      },
    },
  ]);

  return findNews;
};

// find a Single news
export const findASingleNewsServices = async (
  _id: any
): Promise<INewsInterface | any> => {
  // Convert _id to ObjectId
  const objectId = new mongoose.Types.ObjectId(_id);

  const findNews: INewsInterface | null = await NewsModel.findOne({
    _id: objectId,
  }).populate(["category_id", "sub_category_id"]);
  if (!findNews) {
    throw new Error("News not found");
  }

  // Increment the news click count
  await NewsModel.updateOne(
    { _id: objectId },
    { $inc: { news_click: 1 } },
    { runValidators: true }
  );

  const category_id = findNews?.category_id?._id;

  // Convert category_id to ObjectId if it's not already
  const objectIdCategoryId = mongoose.Types.ObjectId.isValid(category_id)
    ? new mongoose.Types.ObjectId(category_id)
    : category_id;

  const findSideNews: INewsInterface[] = await NewsModel.aggregate([
    {
      $match: {
        category_id: objectIdCategoryId, // Ensure proper ObjectId comparison
        _id: { $ne: objectId }, // Exclude the current news
      },
    },
    { $sample: { size: 4 } }, // Randomly select 4 documents
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_id",
      },
    },
    { $unwind: { path: "$category_id", preserveNullAndEmptyArrays: true } },
  ]);

  const sendData = {
    news: findNews,
    sideNews: findSideNews,
  };
  return sendData;
};

// find a Single Archive news
export const findASingleArchiveNewsServices = async (
  _id: any
): Promise<INewsInterface | any> => {
  const findNews: INewsInterface | null = await NewsModel.findOne({
    _id: _id,
  }).populate("category_id");
  return findNews;
};

// find a randomly single Category news
export const findARandomlySingleCategoryMatchNewsServices = async (
  category_slug: any,
  news_id: any
): Promise<INewsInterface | any> => {
  const categoryInfo: ICategoryInterface | any = await CategoryModel.findOne({
    category_slug: category_slug,
  });

  const objectIdCategoryId = categoryInfo?._id;

  const objectNewsId = Types.ObjectId.isValid(news_id)
    ? new Types.ObjectId(news_id)
    : news_id;

  const findNews: INewsInterface[] = await NewsModel.aggregate([
    { $match: { category_id: objectIdCategoryId, _id: { $ne: objectNewsId } } },
    // { $sample: { size: 10 } }, // Randomly select 10 documents
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  // Initialize an array to hold the final results
  const newsWithSideNews = [];

  for (const news of findNews) {
    // Fetch 4 side news for each news item
    const findSideNews: INewsInterface[] = await NewsModel.aggregate([
      { $match: { category_id: news.category_id, _id: { $ne: news?._id } } }, // Match the same category
      { $sample: { size: 4 } }, // Randomly select 4 documents
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category_id",
        },
      },
      { $unwind: { path: "$category_id", preserveNullAndEmptyArrays: true } },
    ]);

    // Push the news item and its corresponding 4 side news into the final array
    newsWithSideNews.push({
      news: news,
      sideNews: findSideNews,
    });
  }

  return newsWithSideNews;
};

// find category page all sub category news
export const findACategoryAndAllSubCategoryNewsServices = async (
  category_slug: any,
  sub_category_slug: any
): Promise<INewsInterface[] | any> => {
  const categoryInfo: ICategoryInterface | any = await CategoryModel.findOne({
    category_slug: category_slug,
  });

  const objectIdCategoryId = categoryInfo?._id;

  const allSubCategory: ISub_CategoryInterface[] | [] =
    await Sub_CategoryModel.find({
      sub_category_status: "active",
      category_id: objectIdCategoryId,
    }).sort({ sub_category_serial: 1 });

  let objectIdSubCategoryId: any;
  let subCategoryInfo: ISub_CategoryInterface | any;
  if (sub_category_slug) {
    subCategoryInfo = await Sub_CategoryModel.findOne({
      sub_category_slug: sub_category_slug,
    });
    objectIdSubCategoryId = subCategoryInfo?._id;
  }

  let matchedNewsBySubCategory: any = [];
  if (allSubCategory.length > 0) {
    matchedNewsBySubCategory = await Promise.all(
      allSubCategory?.map(async (sub_category: any) => {
        const newsInSubCategory = await NewsModel.aggregate([
          {
            $match: {
              sub_category_id: sub_category?._id,
              news_status: "active",
            },
          },
          // { $sample: { size: 10 } },
          { $sort: { _id: -1 } },
          {
            $limit: 10,
          },
        ]);

        return { subCategoryDetails: sub_category, news: newsInSubCategory };
      })
    );
  }

  const matchCondition: any = {
    category_id: objectIdCategoryId,
    news_status: "active",
  };

  if (objectIdSubCategoryId) {
    matchCondition.sub_category_id = objectIdSubCategoryId;
  }

  const newsInCategory = await NewsModel.aggregate([
    { $match: matchCondition },
    // { $sample: { size: 5 } },
    { $sort: { _id: -1 } },
    {
      $limit: 5,
    },
  ]);

  const sendData = {
    allSubCategory: allSubCategory,
    newsInCategory: newsInCategory,
    matchedNewsBySubCategory: matchedNewsBySubCategory,
    categoryInfo: categoryInfo,
    subCategoryInfo: sub_category_slug ? subCategoryInfo : {},
  };

  return sendData;
};

// find all Category News
export const findAllCategoryNewsServices = async (
  limit: number,
  skip: number,
  category_id: any
): Promise<INewsInterface[] | any> => {
  const objectIdCategoryId: any = mongoose.Types.ObjectId.isValid(category_id)
    ? new mongoose.Types.ObjectId(category_id)
    : category_id;

  const findNews: INewsInterface[] | any = await NewsModel.find({
    category_id: objectIdCategoryId,
    news_status: "active",
  })
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findNews;
};

// find all sub category match all News
export const findAllSubCategoryAllNewsServices = async (
  limit: number,
  skip: number,
  sub_category_id: any
): Promise<INewsInterface[] | any> => {
  const objectIdSubCategoryId: any = mongoose.Types.ObjectId.isValid(
    sub_category_id
  )
    ? new mongoose.Types.ObjectId(sub_category_id)
    : sub_category_id;

  const findNews: INewsInterface[] | any = await NewsModel.find({
    sub_category_id: objectIdSubCategoryId,
    news_status: "active",
  })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findNews;
};

// find all latest news with pagination and with if category and sub category exist
export const findAllLatestNewsWithIfCategoryAndSubCategoryServices = async (
  category_slug: any,
  sub_category_slug: any,
  limit: number,
  skip: number,
  searchTerm: any
): Promise<INewsInterface[] | any> => {
  let objectIdCategoryId: any;
  if (category_slug) {
    const categoryInfo: ICategoryInterface | any = await CategoryModel.findOne({
      category_slug: category_slug,
    });
    objectIdCategoryId = categoryInfo?._id;
  }

  let objectIdSubCategoryId: any;
  if (sub_category_slug) {
    const subCategoryInfo: ISub_CategoryInterface | any =
      await Sub_CategoryModel.findOne({ sub_category_slug: sub_category_slug });
    objectIdSubCategoryId = subCategoryInfo?._id;
  }

  const whereCondition: any = {
    news_status: "active",
  };

  // Add category and subcategory conditions
  if (objectIdCategoryId) {
    whereCondition.category_id = objectIdCategoryId;
  }
  if (objectIdSubCategoryId) {
    whereCondition.sub_category_id = objectIdSubCategoryId;
  }

  // If searchTerm is provided, add it to the whereCondition
  if (
    searchTerm &&
    searchTerm !== "" &&
    searchTerm !== undefined &&
    searchTerm !== "null" &&
    searchTerm !== "undefined" &&
    searchTerm !== null
  ) {
    whereCondition.$or = newsSearchableField.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: "i",
      },
    }));
  }

  const newsInCategory = await NewsModel.aggregate([
    { $match: whereCondition },
    { $sort: { home_position: 1 } },
    { $skip: skip }, // Skip functionality
    { $limit: limit }, // Limit the number of documents returned
    {
      $lookup: {
        from: "categories",
        localField: "category_id",
        foreignField: "_id",
        as: "category_id",
      },
    },
    { $unwind: { path: "$category_id", preserveNullAndEmptyArrays: true } },
  ]);

  const sendData = {
    news: newsInCategory,
  };

  return sendData;
};

// Find ShowCard category news
export const findAllArchiveNewsServices = async (
  date: any,
  edition: any
): Promise<INewsInterface[] | any> => {
  const [day, month, year] = date.split("/");
  const today = new Date(Date.UTC(+year, +month - 1, +day)); // Convert strings to numbers
  const todayStr = today.toISOString().substring(0, 10);

  if (edition == "online") {
    const showTodatNewsCategory: ICategoryInterface[] | [] =
      await CategoryModel.find({ category_status: "active" }).sort({
        category_serial: 1,
      });
    const matchedNewsByshowTodatNewsCategory = await Promise.all(
      showTodatNewsCategory?.map(async (category: any) => {
        const newsInCategory = await NewsModel.find({
          news_status: "active",
          category_id: category?._id?.toString(),
          createdAt: {
            $gte: new Date(todayStr), // Start of the day
            $lt: new Date(
              new Date(todayStr).setDate(new Date(todayStr).getDate() + 1)
            ), // Start of the next day
          },
        })
          .populate(["category_id", "sub_category_id"])
          .sort({ home_position: 1 });

        return { categoryDetails: category, news: newsInCategory };
      })
    );
    return matchedNewsByshowTodatNewsCategory;
  } else {
    const showTodatNewsCategory: ITodayNewsCategoryInterface[] | [] =
      await TodayNewsCategoryModel.find({ category_status: "active" }).sort({
        category_serial: 1,
      });
    const matchedNewsByshowTodatNewsCategory = await Promise.all(
      showTodatNewsCategory?.map(async (category: any) => {
        const newsInCategory = await NewsModel.find({
          news_status: "active",
          today_news_category_id: category?._id?.toString(),
          createdAt: {
            $gte: new Date(todayStr), // Start of the day
            $lt: new Date(
              new Date(todayStr).setDate(new Date(todayStr).getDate() + 1)
            ), // Start of the next day
          },
        })
          .populate([
            "category_id",
            "sub_category_id",
            "today_news_category_id",
          ])
          .sort({ home_position: 1 });
        return { categoryDetails: category, news: newsInCategory };
      })
    );
    return matchedNewsByshowTodatNewsCategory;
  }
};

// find all dashboard News
export const findAllDashboardNewsServices = async (
  limit: number,
  skip: number,
  searchTerm: any
): Promise<INewsInterface | {}> => {
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: newsSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const findNews: INewsInterface | {} = await NewsModel.find(whereCondition)
    .populate([
      "category_id",
      "sub_category_id",
      "publisher_user_id",
      "today_news_category_id",
      "updated_user_id",
    ])
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findNews;
};

// Update a News
export const updateNewsServices = async (
  data: INewsInterface,
  _id: string
): Promise<INewsInterface | any> => {
  if (!data?.sub_category_id) {
    const News = await NewsModel.updateOne(
      { _id: _id },
      { $unset: { sub_category_id: "" } },
      {
        runValidators: true,
      }
    );
  }
  if (data?.today_news == false) {
    const News = await NewsModel.updateOne(
      { _id: _id },
      { $unset: { today_news_category_id: "" } },
      {
        runValidators: true,
      }
    );
  }
  if (!data?.image_key) {
    const News = await NewsModel.updateOne(
      { _id: _id },
      { $unset: { image_key: "" } },
      {
        runValidators: true,
      }
    );
  }
  const updateNewsInfo: INewsInterface | null = await NewsModel.findOne({
    _id: _id,
  });
  if (!updateNewsInfo) {
    return {};
  }
  const News = await NewsModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return News;
};

// delete a News start
export const deleteNewsServices = async (
  _id: string
): Promise<INewsInterface | any> => {
  const deleteNewsInfo: INewsInterface | null = await NewsModel.findOne({
    _id: _id,
  });
  if (!deleteNewsInfo) {
    return {};
  }
  const News = await NewsModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return News;
};
