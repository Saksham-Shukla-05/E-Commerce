import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server Connected to Databse ${con.connection.host}`);
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};

export default connectDB;
