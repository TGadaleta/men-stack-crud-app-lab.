import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.LOCAL_MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
