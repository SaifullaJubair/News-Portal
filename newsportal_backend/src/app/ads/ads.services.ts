import ApiError from "../../errors/ApiError";
import { IAdsInterface, adsSearchableField } from "./ads.interface";
import AdsModel from "./ads.model";

// Find A Ads with serial
export const findAAdsSerialServices = async (
  ads_serial: number
): Promise<IAdsInterface | null> => {
  const findAds: IAdsInterface | null = await AdsModel.findOne({
    ads_serial: ads_serial,
  });
  return findAds;
};

// Create A Ads
export const postAdsServices = async (
  data: IAdsInterface
): Promise<IAdsInterface | {}> => {
  const createAds: IAdsInterface | {} = await AdsModel.create(
    data
  );
  return createAds;
};

// Find All Ads
export const findAllAdsServices = async (): Promise<
  IAdsInterface[] | []
> => {
  const findAds: IAdsInterface[] | [] = await AdsModel.find({
    ads_status: "active",
  })
    .sort({ ads_serial: 1 })
    .select("-__v");
  return findAds;
};

// Find all dashboard Ads
export const findAllDashboardAdsServices = async (
  limit: number,
  skip: number,
  searchTerm: any
): Promise<IAdsInterface[] | []> => {
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: adsSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const findAds: IAdsInterface[] | [] = await AdsModel.find(
    whereCondition
  )
    .sort({ ads_serial: 1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findAds;
};

// Update a Ads
export const updateAdsServices = async (
  data: IAdsInterface,
  _id: string
): Promise<IAdsInterface | any> => {
  const updateAdsInfo: IAdsInterface | null =
    await AdsModel.findOne({ _id: _id });
  if (!updateAdsInfo) {
    return {};
  }
  const Ads = await AdsModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return Ads;
};

// delete a Ads start

export const deleteAdsServices = async (
  _id: string
): Promise<IAdsInterface | any> => {
  const deleteAdsInfo: IAdsInterface | null =
    await AdsModel.findOne({ _id: _id });
  if (!deleteAdsInfo) {
    return {};
  }
  const Ads = await AdsModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return Ads;
};
