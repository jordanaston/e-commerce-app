import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import Link from "next/link";
import { Divider } from "antd";
import { Cart } from "@/server/models/cart.models";
import QuantityIndicator from "./QuantityIndicator";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CartDescription({
  product,
  cart,
}: {
  product: Product;
  cart: Cart;
}) {
  const [removeQuantity, setRemoveQuantity] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const utils = trpc.useUtils();
  const quantity =
    cart.products.find((p) => p.productId === product.id)?.quantity ?? 0;

  const removeFromCart = trpc.cart.removeFromCart.useMutation({
    onSuccess: () => {
      utils.cart.getCart.invalidate();
      toast.success(
        `Removed ${removeQuantity} ${
          Number(removeQuantity) === 1 ? "item" : "items"
        } from cart`
      );
      setRemoveQuantity("");
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to remove from cart. Please try again."
      );
    },
  });

  useEffect(() => {
    if (removeFromCart.isSuccess) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [removeFromCart.isSuccess]);

  return (
    <div className="flex">
      <div
        key={product.id}
        className="flex flex-col bg-white w-[250px]  shadow-md items-center justify-center"
      >
        <Link href={`/product?id=${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={100}
            className="mx-auto"
          />
        </Link>
      </div>
      <div className="flex flex-col bg-grey-200 w-[550px] p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-xl font-medium">{product.title}</p>
          <div className="flex items-center gap-2">
            <div
              className={`transition-all duration-300 ease-in-out ${
                isAnimating ? "scale-125" : "scale-100"
              }`}
            >
              <QuantityIndicator product={product} cart={cart} />
            </div>
          </div>
        </div>
        <p className="text-sm font-medium capitalize">{product.category}</p>

        <Divider style={{ backgroundColor: "black", opacity: 0.2 }} />
        <p className="text-sm">
          {product.description.charAt(0).toUpperCase() +
            product.description.slice(1)}
        </p>
        <div className="flex items-center my-4">
          <p className="text-2xl font-bold">${product.price}</p>
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2">
            <Select value={removeQuantity} onValueChange={setRemoveQuantity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quantity to Remove" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Quantity to Remove</SelectItem>
                {Array.from({ length: quantity }, (_, i) => i + 1).map(
                  (num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? "Item" : "Items"}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Button
              className="flex justify-center items-center p-4"
              onClick={() =>
                removeFromCart.mutate({
                  productId: product.id,
                  quantity: Number(removeQuantity),
                })
              }
              disabled={
                removeFromCart.isPending ||
                !removeQuantity ||
                removeQuantity === "default"
              }
            >
              {removeFromCart.isPending ? "Removing..." : "Remove from Cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
