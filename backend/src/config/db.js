import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB Atlas (smart_tutor)");
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
  }
};

export default connectDB;
