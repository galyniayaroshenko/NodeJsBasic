import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: String,
  email: String,
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

export const users: any[] = [{
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}]

// export interface UserEntity {
//     id: string; // uuid
// }
  
// export const users: UserEntity[] = [{
//     id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
// }]