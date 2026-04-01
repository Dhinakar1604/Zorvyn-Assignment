import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: { type: String, enum: ["income", "expense"] },
  category: String,
  date: Date,
  notes: String
}, { timestamps: true });

export default mongoose.model("Record", recordSchema);