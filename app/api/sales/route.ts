import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";
import Sale from "@/models/sales";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { productId, quantity, customerName } = req.body;

      // Find the product
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      if (quantity > product.quantity) {
        return res.status(400).json({ message: "Not enough stock" });
      }

      const total = product.price * quantity;

      // Create sale record
      const sale = await Sale.create({
        productId,
        productName: product.name,
        quantity,
        price: product.price,
        total,
        customerName,
      });

      // Update product quantity
      product.quantity -= quantity;
      await product.save();

      res.status(201).json(sale);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else if (req.method === "GET") {
    try {
      const sales = await Sale.find().sort({ date: -1 });
      res.status(200).json(sales);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}