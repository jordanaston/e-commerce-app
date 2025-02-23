import { trpc } from "@/utils/trpc";
import Layout from "@/components/Layout";
import ItemCard from "@/components/ItemCard";

export default function Home() {
  const {
    data: products,
    isLoading,
    error,
  } = trpc.product.getAllProducts.useQuery();
  return (
    <Layout>
      <div className="min-h-screen py-16 mx-auto lg:px-48 md:px-24 sm:px-16 px-8">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="flex flex-wrap gap-4 justify-center">
          {products &&
            products.map((product) => (
              <ItemCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </Layout>
  );
}
