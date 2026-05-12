import Product from "@/models/Product";
import SaleModel from "@/models/sales";

export async function getTopProducts(userId: string) {
  return Product.find({ userId })
    .sort({ quantity: -1 })
    .limit(5);
}

export async function getTotalSales(userId: string) {
  const res = await SaleModel.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        total: { $sum: "ksh total" }, //usd to ksh  
      },
    },
  ]);

  return res[0]?.total || 0;
}

export async function getLowStock(userId: string) {
  return Product.find({
    userId,
    quantity: { $lt: 5 },
  });
}