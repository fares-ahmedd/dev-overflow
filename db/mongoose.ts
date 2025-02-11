import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB_URL is not defined");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "dev-overflow",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};
