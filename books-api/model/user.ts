import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';

interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export const UserSchema = new Schema<IUser>({
    id: { type: String, default: uuidv4() },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ['admin', 'user'] },
});

UserSchema.pre('save', async function (next) {
    const user = this as IUser & Document;
    if (!user.isModified('password')) return next();
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
});

const User = model('user', UserSchema);
export default User;
