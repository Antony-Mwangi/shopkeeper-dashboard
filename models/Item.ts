import mongoose, { Schema, model, models } from "mongoose";

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },       // Selling Price
    buyingPrice: { type: Number, required: true }, // Buying Price
    quantity: { type: Number, required: true },
    category: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default models.Item || model("Item", ItemSchema);