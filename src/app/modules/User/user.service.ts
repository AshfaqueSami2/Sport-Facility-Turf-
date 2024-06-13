import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(userData: TUser)=>{
    const newUser = new User(userData)
    const result  = await newUser.save()
    return result
}

export const  UserServices = {
    createUserIntoDB
}