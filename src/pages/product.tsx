import ItemDescription from "@/components/ItemDescription";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: product,
    isLoading,
    error,
  } = trpc.product.getProductById.useQuery(
    { id: Number(id) },
    {
      enabled: !!id,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <Button onClick={() => router.back()} className="mb-4">
          <IoIosArrowBack className="text-xl" />
        </Button>
        {product && <ItemDescription product={product} />}
      </div>
    </Layout>
  );
};

export default Product;
