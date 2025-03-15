import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import Link from "next/link";
import { Divider } from "antd";
import { Cart } from "@/server/models/cart.models";
import QuantityIndicator from "./QuantityIndicator";

export default function CartDescription({
  product,
  cart,
}: {
  product: Product;
  cart: Cart;
}) {
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
            <QuantityIndicator product={product} cart={cart} />
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
        <Button className="flex justify-center items-center p-4">
          Remove from Cart
        </Button>
      </div>
    </div>
  );
}
