import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  dni: String,
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "tutor", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
