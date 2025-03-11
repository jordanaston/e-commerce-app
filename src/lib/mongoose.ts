import mongoose from "mongoose";

const dbConnect = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const uri = process.env.MONGODB_URI;
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");

    const connection = mongoose.connection;
    connection.on("connected", () =>
      console.log("MongoDB connection event: connected")
    );
    connection.on("error", (err) =>
      console.log("MongoDB connection error:", err)
    );
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    throw error;
  }
};

dbConnect().catch((err) => console.log("Top level MongoDB error:", err));

export default dbConnect;
