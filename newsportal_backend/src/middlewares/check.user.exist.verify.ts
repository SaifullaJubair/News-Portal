import UserModel from "../app/user.reg/user.model";

// Find A User is Exist ?
export const checkAUserExitsForVerify = async (
  user_phone: string
): Promise<any> => {
  const FindUser = await UserModel.findOne({ user_phone: user_phone }).populate("role_id");
  return FindUser;
};
