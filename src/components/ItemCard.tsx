import Image from "next/image";
import { Product } from "@/types/product";

export default function ItemCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div
        key={product.id}
        className="flex flex-col bg-white w-[250px] h-[350px] p-4 shadow-md items-center justify-center "
      >
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={100}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
