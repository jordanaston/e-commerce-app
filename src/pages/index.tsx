import { trpc } from "@/utils/trpc";
import Layout from "@/components/Layout";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";

const Home = () => {
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
      <div className="container mx-auto sm:px-4 py-16 transition-all duration-500 ease-out will-change-auto">
        <div className="flex flex-wrap gap-4 justify-center transition-all duration-500 ease-out will-change-[transform,width,margin] motion-reduce:transition-none">
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
};

export default Home;
