const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
