import mongoose from "mongoose";
import { InferSchemaType } from "mongoose";

const cartProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: [true, "Product ID is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    products: [cartProductSchema],
  },
  {
    timestamps: true,
  }
);

export type Cart = InferSchemaType<typeof cartSchema>;

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
