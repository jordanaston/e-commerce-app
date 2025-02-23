import ItemDescription from "@/components/ItemDescription";
import Layout from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

export default function Product() {
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
      <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {product && <ItemDescription product={product} />}
      </div>
    </Layout>
  );
}
