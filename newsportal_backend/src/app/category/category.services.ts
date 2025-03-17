import ApiError from "../../errors/ApiError";
import { INewsInterface } from "../news/news.interface";
import NewsModel from "../news/news.model";
import { ISub_CategoryInterface } from "../sub_category/sub_category.interface";
import Sub_CategoryModel from "../sub_category/sub_category.model";
import {
  ICategoryInterface,
  categorySearchableField,
} from "./category.interface";
import CategoryModel from "./category.model";

// Find A Category
export const findACategoryServices = async (
  category_slug: string
): Promise<ICategoryInterface | null> => {
  const findCategory: ICategoryInterface | null = await CategoryModel.findOne({
    category_slug: category_slug,
  });
  return findCategory;
};

// Find A Category with serial
export const findACategorySerialServices = async (
  category_serial: number
): Promise<ICategoryInterface | null> => {
  const findCategory: ICategoryInterface | null = await CategoryModel.findOne({
    category_serial: category_serial,
  });
  return findCategory;
};

// Find A special Category with serial
export const findACategorySpecialSerialServices = async (
  special_category_serial: number
): Promise<ICategoryInterface | null> => {
  const findCategory: ICategoryInterface | null = await CategoryModel.findOne({
    special_category_serial: special_category_serial,
  });
  return findCategory;
};

// Create A Category
export const postCategoryServices = async (
  data: ICategoryInterface
): Promise<ICategoryInterface | {}> => {
  const createCategory: ICategoryInterface | {} = await CategoryModel.create(
    data
  );
  return createCategory;
};

// Find All Category
export const findAllCategoryServices = async (): Promise<
  ICategoryInterface[] | []
> => {
  const findCategory: ICategoryInterface[] | [] = await CategoryModel.find({
    category_status: "active",
  })
    .sort({ category_serial: 1 })
    .select("-__v");
  return findCategory;
};

// Find all dashboard Category
export const findAllDashboardCategoryServices = async (
  limit: number,
  skip: number,
  searchTerm: any
): Promise<ICategoryInterface[] | []> => {
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: categorySearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const findCategory: ICategoryInterface[] | [] = await CategoryModel.find(
    whereCondition
  )
    .sort({ category_serial: 1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findCategory;
};

// Update a Category
export const updateCategoryServices = async (
  data: ICategoryInterface,
  _id: string
): Promise<ICategoryInterface | any> => {
  const updateCategoryInfo: ICategoryInterface | null =
    await CategoryModel.findOne({ _id: _id });
  if (!updateCategoryInfo) {
    return {};
  }
  if (data?.show_title) {
    const updateCategoryShowTitleInfo: ICategoryInterface[] | [] =
      await CategoryModel.find({ show_title: "active" });
    if (
      updateCategoryShowTitleInfo?.length >= 10 &&
      data?.show_title == "active"
    ) {
      throw new ApiError(400, "Already 10 title is active");
    }
    const CategoryShowTitleUpdate = await CategoryModel.updateOne(
      { _id: _id },
      data,
      {
        runValidators: true,
      }
    );
    return CategoryShowTitleUpdate;
  }

  if (data?.show_card) {
    const updateCategoryShowCardInfo: ICategoryInterface[] | [] =
      await CategoryModel.find({ show_card: "active" });
    if (
      updateCategoryShowCardInfo?.length >= 14 &&
      data?.show_card == "active"
    ) {
      throw new ApiError(400, "Already 14 card is active");
    }
    const CategoryShowCardUpdate = await CategoryModel.updateOne(
      { _id: _id },
      data,
      {
        runValidators: true,
      }
    );
    return CategoryShowCardUpdate;
  }

  const Category = await CategoryModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return Category;
};

// delete a Category start

// Find A Category in sub category
export const findACategoryExistSubCategoryServices = async (
  _id: string
): Promise<ISub_CategoryInterface | null> => {
  const findCategory: ISub_CategoryInterface | null =
    await Sub_CategoryModel.findOne({
      category_id: _id,
    });
  return findCategory;
};

// Find A Category in News
export const findACategoryExistNewsServices = async (
  _id: string
): Promise<INewsInterface | null> => {
  const findCategory: INewsInterface | null = await NewsModel.findOne({
    category_id: _id,
  });
  return findCategory;
};


export const deleteCategoryServices = async (
  _id: string
): Promise<ICategoryInterface | any> => {
  const deleteCategoryInfo: ICategoryInterface | null =
    await CategoryModel.findOne({ _id: _id });
  if (!deleteCategoryInfo) {
    return {};
  }
  const Category = await CategoryModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return Category;
};
