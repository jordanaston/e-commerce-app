import Image from "next/image";
import { Product } from "@/types/product";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { Divider } from "antd";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useGetUserInfo } from "@/hooks/getUserInfo";

const ItemDescription = ({ product }: { product: Product }) => {
  const { user } = useGetUserInfo();
  const utils = trpc.useUtils();
  const addToCart = trpc.cart.addToCart.useMutation({
    onSuccess: () => {
      toast.success("Item added to cart!");
      utils.cart.getCart.invalidate();
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
    <div className="flex flex-col sm:flex-row mx-auto justify-center">
      <div
        key={product.id}
        className="flex flex-col bg-white w-full sm:w-[250px] shadow-md items-center justify-center p-4"
      >
        <Link href={`/product?id=${product.id}`}>
          <div className="relative w-[200px] h-[200px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="200px"
              style={{ objectFit: "contain" }}
              className="mx-auto relative w-[200px] h-[200px]"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col bg-grey-200 w-full sm:w-[550px] p-4 shadow-lg">
        <p className="text-xl font-medium">{product.title}</p>
        <p className="text-sm font-medium capitalize">{product.category}</p>

        <div className="flex mt-2">
          {Array.from({ length: Math.round(product.rating.rate) }).map(
            (_, index) => (
              <FaStar key={index} color="grey" />
            )
          )}
          <p className="text-sm pl-2">({product.rating.count})</p>
        </div>
        <Divider className="bg-black opacity-20" />
        <p className="text-sm">
          {product.description.charAt(0).toUpperCase() +
            product.description.slice(1)}
        </p>
        <div className="my-4">
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-md text-green">In stock</p>
        </div>
        <div className="flex-grow" />
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

export default ItemDescription;
