import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Mongo DB  connected ");
  } catch (error) {
    console.log("Error connection DB", error);
    process.exit(1);
  }
};
