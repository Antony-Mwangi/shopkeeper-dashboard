import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    quantitySold: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sale = mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
export default Sale;