import CartDescription from "@/components/CartDescription";
import Layout from "@/components/Layout";
import Summary from "@/components/Summary";
import { useGetUserInfo } from "@/hooks/getUserInfo";
import { trpc } from "@/utils/trpc";
import { Divider } from "antd";
import { IoCartOutline } from "react-icons/io5";

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
      <div className="min-h-screen max-w-screen-lg mx-auto p-8 pb-20 gap-16 sm:p-20">
        <div className="flex items-center gap-2">
          <p>Items in cart</p>
          <IoCartOutline className="text-xl" />
        </div>
        <Divider className="bg-black opacity-20 mt-4 mb-6" />
        {productData &&
          productData.map((product, index) => (
            <div key={index} className="flex flex-col items-center mb-8">
              <CartDescription product={product} cart={cart} />
            </div>
          ))}
        <Summary />
      </div>
    </Layout>
  );
};

export default Orders;
