import { IUserInterface } from "../user.reg/user.interface";
import UserModel from "../user.reg/user.model";

// Check a user is exists?
export const findUserInfoServices = async (user_phone: string): Promise<IUserInterface | null> => {
    const user = await UserModel.findOne({ user_phone: user_phone }).populate('role_id').select('-user_password');
    if (user) {
        return user;
    } else {
        return null
    }
}
