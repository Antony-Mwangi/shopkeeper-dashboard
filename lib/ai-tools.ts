// import Product from "@/models/Product";
// import SaleModel from "@/models/sales";

// export async function getTopProducts(userId: string) {
//   return Product.find({ userId })
//     .sort({ quantity: -1 })
//     .limit(5);
// }

// export async function getTotalSales(userId: string) {
//   const res = await SaleModel.aggregate([
//     { $match: { userId } },
//     {
//       $group: {
//         _id: null,
//         total: { $sum: "$total" },
//       },
//     },
//   ]);

//   return res[0]?.total || 0;
// }

// export async function getLowStock(userId: string) {
//   return Product.find({
//     userId,
//     quantity: { $lt: 5 },
//   });
// }


import Product from "@/models/Product";
import SaleModel from "@/models/sales";

/* =========================
   TOP PRODUCTS
========================= */
export async function getTopProducts(userId: string) {
  return await Product.find({ userId })
    .sort({ quantity: -1 })
    .limit(5)
    .lean();
}

/* =========================
   TOTAL SALES (KSH READY)
========================= */
export async function getTotalSales(userId: string) {
  const result = await SaleModel.aggregate([
    {
      $match: { userId },
    },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$total" }, // assumes "total" is stored in KSH
      },
    },
  ]);

  const total = result?.[0]?.totalSales || 0;

  return {
    raw: total,
    formatted: `KSh ${total.toLocaleString("en-KE")}`,
    currency: "KSH",
  };
}

/* =========================
   LOW STOCK PRODUCTS
========================= */
export async function getLowStock(userId: string) {
  return await Product.find({
    userId,
    quantity: { $lt: 5 },
  }).lean();
}