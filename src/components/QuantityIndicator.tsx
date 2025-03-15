import { Cart } from "@/server/models/cart.models";
import { Product } from "@/types/product";

const QuantityIndicator = ({
  product,
  cart,
}: {
  product: Product;
  cart: Cart;
}) => {
  const quantity =
    cart.products.find((p) => p.productId === product.id)?.quantity ?? 0;

  return (
    <div className="flex items-center justify-center bg-red text-white rounded-full w-6 h-6 text-sm">
      {quantity}
    </div>
  );
};

export default QuantityIndicator;
