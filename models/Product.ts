import { Schema, model, models } from "mongoose";
const ProductSchema = new Schema (
    {
        name: {type: String, required:true },
        price: {type: String, required:true},
        quantity: {type: Number, required:true},
        category: { type:String, required: "General"},
        userId: { type:Schema.Types.ObjectId, ref: "User", required: true},
    },

    { timestamps:true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;