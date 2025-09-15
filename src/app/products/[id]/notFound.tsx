import Link from "next/link";
import { Button } from "@/components/ui/button";

function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The product you&apos;re looking for doesn&apos;t exist.
      </p>

      <Button asChild>
        <Link href="/products">Back to Products</Link>
      </Button>
    </div>
  );
}

export default ProductNotFound;
