import { IOnlineJoripInterface, onlineJoripSearchableField } from "./online_jorip.interface";
import OnlineJoripModel from "./online_jorip.model";

// Create A OnlineJorip
export const postOnlineJoripServices = async (
  data: IOnlineJoripInterface
): Promise<IOnlineJoripInterface | {}> => {
  const createOnlineJorip: IOnlineJoripInterface | {} = await OnlineJoripModel.create(
    data
  );
  return createOnlineJorip;
};

// Find A OnlineJorip
export const findAOnlineJoripServices = async (_id: any): Promise<
  IOnlineJoripInterface | any
> => {
  const findOnlineJorip: IOnlineJoripInterface | any = await OnlineJoripModel.findOne({
    _id: _id,
  })
    .select("-__v");
  return findOnlineJorip;
};

// Find Two OnlineJorip
export const findTwoOnlineJoripServices = async (): Promise<
  IOnlineJoripInterface[] | []
> => {
  const findOnlineJorip: IOnlineJoripInterface[] | [] = await OnlineJoripModel.find({
    online_jorip_status: "active",
  })
    .sort({ _id: -1 })
    .limit(1)
    .select("-__v");
  return findOnlineJorip;
};

// Find all OnlineJorip
export const findAllOnlineJoripServices = async (
  limit: number,
  skip: number
): Promise<IOnlineJoripInterface[] | []> => {
  const findOnlineJorip: IOnlineJoripInterface[] | [] = await OnlineJoripModel.find({})
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findOnlineJorip;
};

// Find all dashboard OnlineJorip
export const findAllDashboardOnlineJoripServices = async (
  limit: number,
  skip: number,
  searchTerm: any
): Promise<IOnlineJoripInterface[] | []> => {
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: onlineJoripSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const findOnlineJorip: IOnlineJoripInterface[] | [] = await OnlineJoripModel.find(
    whereCondition
  )
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findOnlineJorip;
};

// Update a OnlineJorip
export const updateOnlineJoripServices = async (
  data: IOnlineJoripInterface,
  _id: string
): Promise<IOnlineJoripInterface | any> => {
  const updateOnlineJoripInfo: IOnlineJoripInterface | null =
    await OnlineJoripModel.findOne({ _id: _id });
  if (!updateOnlineJoripInfo) {
    return {};
  }
  const OnlineJorip = await OnlineJoripModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return OnlineJorip;
};

// delete a OnlineJorip start

export const deleteOnlineJoripServices = async (
  _id: string
): Promise<IOnlineJoripInterface | any> => {
  const deleteOnlineJoripInfo: IOnlineJoripInterface | null =
    await OnlineJoripModel.findOne({ _id: _id });
  if (!deleteOnlineJoripInfo) {
    return {};
  }
  const OnlineJorip = await OnlineJoripModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return OnlineJorip;
};
