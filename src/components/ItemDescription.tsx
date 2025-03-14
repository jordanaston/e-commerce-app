import Image from "next/image";
import { Product } from "@/types/product";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { Divider } from "antd";
import { useRouter } from "next/router";

export default function ItemDescription({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <div className="flex">
      <Button
        onClick={() => router.back()}
        className="bg-transparent text-grey-900 border-none shadow-none hover:bg-transparent"
      >
        ← Back
      </Button>
      <div
        key={product.id}
        className="flex flex-col bg-white w-[250px] shadow-md items-center justify-center p-4"
      >
        <Link href={`/product?id=${product.id}`}>
          <div className="relative w-[200px] h-[200px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="200px"
              style={{ objectFit: "contain" }}
              className="mx-auto"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col bg-grey-200 w-[550px] p-4 shadow-lg">
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
        <Divider style={{ backgroundColor: "black", opacity: 0.2 }} />
        <p className="text-sm">
          {product.description.charAt(0).toUpperCase() +
            product.description.slice(1)}
        </p>
        <div className="my-4">
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-md text-green">In stock</p>
        </div>
        <div className="flex-grow" />
        <Button className="flex justify-center items-center p-4">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
