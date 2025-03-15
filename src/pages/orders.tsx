import CartDescription from "@/components/CartDescription";
import Layout from "@/components/Layout";
import { useGetUserInfo } from "@/hooks/getUserInfo";
import { trpc } from "@/utils/trpc";
import { Divider } from "antd";

const Orders = () => {
  const { user } = useGetUserInfo();
  const { data: cart } = trpc.cart.getCart.useQuery(undefined, {
    enabled: !!user,
  });

  const productIds =
    cart?.products.map((item: { productId: number }) => item.productId) || [];

  const { data: productData } = trpc.product.getProductsByIds.useQuery(
    { ids: productIds },
    { enabled: productIds.length > 0 }
  );

  return (
    <Layout>
      <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="mb-[-16px]">Items in cart</div>
        <Divider
          style={{
            backgroundColor: "black",
            opacity: 0.2,
            marginBottom: "40px",
          }}
        />
        {productData &&
          productData.map((product, index) => (
            <div key={index} className="mb-8">
              <CartDescription product={product} cart={cart} />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Orders;
