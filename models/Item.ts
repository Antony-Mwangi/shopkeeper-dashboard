import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
export default Item;