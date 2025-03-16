import Image from "next/image";
import { Product } from "@/types/product";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useGetUserInfo } from "@/hooks/getUserInfo";

const ItemCard = ({ product }: { product: Product }) => {
  const { user } = useGetUserInfo();
  const utils = trpc.useUtils();
  const addToCart = trpc.cart.addToCart.useMutation({
    onSuccess: () => {
      toast.success("Item added to cart!");
      utils.cart.invalidate();
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
        className="flex flex-col bg-white w-[180px] h-[250px] sm:w-[250px] sm:h-[320px] shadow-md items-center justify-center relative animated-border"
      >
        <Link href={`/product?id=${product.id}`} className="">
          <div className="relative w-[100px] h-[100px] sm:w-[150px] sm:h-[150px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="150px"
              style={{ objectFit: "contain" }}
              className="mx-auto hover:translate-y-[-5px] transition-transform duration-300"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-between bg-grey-200 w-[180px] h-[250px] sm:w-[250px] sm:h-[280px] p-4 shadow-lg">
        <p className="text-md sm:text-2xl font-bold">${product.price}</p>
        <div className="flex flex-col justify-start min-h-36">
          <p className="text-xs sm:text-sm">{product.title}</p>
          <p className=" text-xs sm:text-sm font-medium capitalize">
            {product.category}
          </p>
          <div className="flex mt-2">
            {Array.from({ length: Math.round(product.rating.rate) }).map(
              (_, index) => (
                <FaStar
                  key={index}
                  color="grey"
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              )
            )}
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={addToCart.isPending}
          isLoading={addToCart.isPending}
          className="flex justify-center items-center p-4"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;
