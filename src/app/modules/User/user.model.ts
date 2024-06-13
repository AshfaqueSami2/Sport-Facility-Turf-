import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser,UserModel>({
  name: {
    type: String,
    required: true,
    sort: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sort: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
    sort: true,
  },
});

userSchema.statics.isUserExistsByEmail = async function(email:string){
return await User.findOne({email})
}


export const User = model<TUser,UserModel>('User', userSchema);
