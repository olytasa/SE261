import mongoose from "mongoose";

export async function connectDB(uri: string) {
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}