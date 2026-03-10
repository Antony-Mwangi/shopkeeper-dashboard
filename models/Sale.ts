import mongoose, { Schema, model, models } from "mongoose";

export interface Sale {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
  customerName?: string;
}

const SaleSchema = new Schema<Sale>({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  customerName: { type: String },
});

const SaleModel = models.Sale || model<Sale>("Sale", SaleSchema);
export default SaleModel;