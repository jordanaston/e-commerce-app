import { router } from "../trpc";
import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { Cart } from "../models/cart.models";

export const cartRouter = router({
  addToCart: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      let cart = await Cart.findOne({ userId: ctx.user.userId });

      if (!cart) {
        cart = await Cart.create({
          userId: ctx.user.userId,
          products: [{ productId: input.productId, quantity: input.quantity }],
        });
      } else {
        const existingProduct = cart.products.find(
          (p: { productId: number }) => p.productId === input.productId
        );

        if (existingProduct) {
          existingProduct.quantity += input.quantity;
        } else {
          cart.products.push({
            productId: input.productId,
            quantity: input.quantity,
          });
        }
        await cart.save();
      }

      return cart;
    }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const cart = await Cart.findOne({ userId: ctx.user.userId });
    return cart;
  }),
  removeFromCart: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const cart = await Cart.findOne({ userId: ctx.user.userId });
      const product = cart.products.find(
        (p: { productId: number }) => p.productId === input.productId
      );

      if (product.quantity <= input.quantity) {
        cart.products = cart.products.filter(
          (p: { productId: number }) => p.productId !== input.productId
        );
      } else {
        product.quantity -= input.quantity;
      }

      await cart.save();
      return cart;
    }),
});
