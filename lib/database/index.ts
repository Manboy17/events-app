import mongoose from "mongoose";

const MONGODB_URI = process.env.NODE_ENV;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MongoDB URI not found");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "events-app",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
