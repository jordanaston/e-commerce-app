import { trpc } from "@/utils/trpc";
import Layout from "@/components/Layout";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    data: products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  } = trpc.product.getAllProducts.useInfiniteQuery(["products"], {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <div className="min-h-screen py-16 mx-auto lg:px-48 md:px-24 sm:px-16 px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {products &&
            products.pages.map((page) =>
              page.products.map((product) => (
                <ItemCard key={product.id} product={product} />
              ))
            )}
        </div>
        {hasNextPage && (
          <div className="flex justify-center">
            <Button onClick={() => fetchNextPage()} className="mt-12">
              Load More...
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
