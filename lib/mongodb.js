import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI");
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return "Connected";
    }

    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");
    return "Connected";
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    return "Error";
  }
}
