import mongoose, { Schema, model, models } from "mongoose";

const SaleSchema = new Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    quantitySold: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    netProfit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default models.Sale || model("Sale", SaleSchema);