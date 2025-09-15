import { notFound } from "next/navigation";
import ProductDetail from "../_component/detail";
import { mockProducts } from "../mock-products";
import Navbar from "@/components/navbar";
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

function ProductDetailPage({params} : ProductDetailPageProps) {
    const productId = parseInt(params.id);
    let product = mockProducts.find((p) => p.id === productId);
    if(!product) {
        notFound();
    }

    // Ensure brand is always defined
    if (!product.brand) {
        product = { ...product, brand: "" };
    }

    return(
      <>
      <Navbar />
        <section className="p-3 mt-16">
            <ProductDetail product={product} />
        </section>
      </>
    )
}

export default ProductDetailPage;