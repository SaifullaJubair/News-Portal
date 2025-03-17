import { IUserInterface, userSearchableField } from "./user.interface";
import UserModel from "./user.model";

// Find A User phone
export const findAUserPhoneServices = async (
  user_phone: string
): Promise<IUserInterface | null> => {
  const findUser: IUserInterface | null = await UserModel.findOne({
    user_phone: user_phone,
  });
  return findUser;
};
// Find A User Email
export const findAUserEmailServices = async (
  user_email: string
): Promise<IUserInterface | null> => {
  const findUser: IUserInterface | null = await UserModel.findOne({
    user_email: user_email,
  });
  return findUser;
};
// Find A User Id
export const findAUserIdServices = async (
  user_id: string
): Promise<IUserInterface | null> => {
  const findUser: IUserInterface | null = await UserModel.findOne({
    user_id: user_id,
  });
  return findUser;
};

// Create A User
export const postUserServices = async (
  data: IUserInterface
): Promise<IUserInterface | {}> => {
  const createUser: IUserInterface | {} = await UserModel.create(data);
  return createUser;
};

// Find all dashboard User
export const findAllDashboardUserServices = async (
  limit: number,
  skip: number,
  searchTerm: any
): Promise<IUserInterface[] | []> => {
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const findUser: IUserInterface[] | [] = await UserModel.find(whereCondition)
    .populate("role_id")
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit)
    .select("-__v");
  return findUser;
};

// Update a User
export const updateUserServices = async (
  data: IUserInterface,
  _id: string
): Promise<IUserInterface | any> => {
  const updateUserInfo: IUserInterface | null = await UserModel.findOne({
    _id: _id,
  });
  if (!updateUserInfo) {
    return {};
  }
  const User = await UserModel.updateOne({ _id: _id }, data, {
    runValidators: true,
  });
  return User;
};

// delete a User start

export const deleteUserServices = async (
  _id: string
): Promise<IUserInterface | any> => {
  const deleteUserInfo: IUserInterface | null = await UserModel.findOne({
    _id: _id,
  });
  if (!deleteUserInfo) {
    return {};
  }
  const User = await UserModel.deleteOne(
    { _id: _id },
    {
      runValidators: true,
    }
  );
  return User;
};
