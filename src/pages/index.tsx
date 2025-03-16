import { trpc } from "@/utils/trpc";
import Layout from "@/components/Layout";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Home = () => {
  const {
    data: products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.product.getAllProducts.useInfiniteQuery(["products"], {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (isLoading)
    return (
      <Layout>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-foreground" />
        </div>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground">
            Error loading products. Please reload the page.
          </p>
        </div>
      </Layout>
    );
  return (
    <Layout>
      <div className="container mx-auto sm:px-4 pt-8 pb-16 transition-all duration-500 ease-out will-change-auto">
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
            <Button
              onClick={() => fetchNextPage()}
              className="mt-12"
              isLoading={isFetchingNextPage}
            >
              Load More...
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
