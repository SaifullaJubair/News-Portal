import { IUserInterface } from "../user.reg/user.interface";
import UserModel from "../user.reg/user.model";

// Check a user is exists?
export const findUser = async (user_phone: string): Promise<IUserInterface | null> => {
    const users: IUserInterface | null = await UserModel.findOne({ user_phone: user_phone });
    return users;
}
