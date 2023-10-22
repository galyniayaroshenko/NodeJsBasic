import mongoose, { ConnectOptions } from 'mongoose';

const mongoURI: string = 'mongodb://mongoadmin:bdung@localhost:27017/mongoDB';

export const connectToDatabase = async () => {
  try {
    const options: ConnectOptions | any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: 'mongoadmin',
      pass: 'bdung',
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoURI, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};
