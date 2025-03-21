import ItemDescription from "@/components/ItemDescription";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { Loader2 } from "lucide-react";

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
            Error loading item. Please reload the page.
          </p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-screen p-8 pb-16">
        <Button onClick={() => router.back()} className="mb-4">
          <IoIosArrowBack className="text-xl" />
        </Button>
        {product && <ItemDescription product={product} />}
      </div>
    </Layout>
  );
};

export default Product;
