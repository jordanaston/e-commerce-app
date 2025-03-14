import Image from "next/image";
import { Product } from "@/types/product";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useGetUserInfo } from "@/hooks/getUserInfo";

export default function ItemCard({ product }: { product: Product }) {
  const { user } = useGetUserInfo();
  const addToCart = trpc.cart.addToCart.useMutation({
    onSuccess: () => {
      toast.success("Item added to cart!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add item to cart");
    },
  });

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    addToCart.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col flex-wrap justify-center">
      <div
        key={product.id}
        className="flex flex-col bg-white w-[250px] h-[350px] shadow-md items-center justify-center"
      >
        <Link href={`/product?id=${product.id}`} className="hover:opacity-65">
          <div className="relative w-[150px] h-[150px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="150px"
              style={{ objectFit: "contain" }}
              className="mx-auto"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between bg-grey-200 w-[250px] h-72 p-4 shadow-lg">
        <p className="text-2xl font-bold">${product.price}</p>
        <div className="flex flex-col justify-start min-h-36">
          <p className="text-sm">{product.title}</p>
          <p className="text-sm font-medium capitalize">{product.category}</p>
          <div className="flex mt-2">
            {Array.from({ length: Math.round(product.rating.rate) }).map(
              (_, index) => (
                <FaStar key={index} color="grey" />
              )
            )}
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={addToCart.isPending}
          className="flex justify-center items-center p-4"
        >
          {addToCart.isPending ? "Adding to Cart..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
