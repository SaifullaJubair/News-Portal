import ApiError from "../../errors/ApiError";
import { ISocialMediaInterface } from "./social.media.interface";
import SocialMediaModel from "./social.media.model";

// Create A SocialMedia
export const postSocialMediaServices = async (
  data: ISocialMediaInterface
): Promise<ISocialMediaInterface | {}> => {
  const createSocialMedia: ISocialMediaInterface | {} = await SocialMediaModel.create(
    data
  );
  return createSocialMedia;
};

// Find All SocialMedia
export const findAllSocialMediaServices = async (): Promise<
  ISocialMediaInterface[] | []
> => {
  const findSocialMedia: ISocialMediaInterface[] | [] = await SocialMediaModel.find({
  })
    .sort({ _id: -1 })
    .select("-__v");
  return findSocialMedia;
};

// Update a SocialMedia
export const updateSocialMediaServices = async (
  data: ISocialMediaInterface,
  _id: string
): Promise<ISocialMediaInterface | any> => {
  const updateSocialMediaInfo: ISocialMediaInterface | null =
    await SocialMediaModel.findOne({ _id: _id });
  if (!updateSocialMediaInfo) {
    return {};
  }

  const SocialMedia = await SocialMediaModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return SocialMedia;
};

// delete a SocialMedia start

export const deleteSocialMediaServices = async (
  _id: string
): Promise<ISocialMediaInterface | any> => {
  const deleteSocialMediaInfo: ISocialMediaInterface | null =
    await SocialMediaModel.findOne({ _id: _id });
  if (!deleteSocialMediaInfo) {
    return {};
  }
  const SocialMedia = await SocialMediaModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return SocialMedia;
};
