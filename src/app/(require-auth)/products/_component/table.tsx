import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

function ProductsTable({ products }: { products: Product[] }) {
  const columnsNotToShow = [
    "id",
    "description",
    "discountPercentage",
    "rating",
    "thumbnail",
    "images",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(products[0]).map(
            (head, index) =>
              !columnsNotToShow.includes(head) && (
                <TableHead key={index} className="capitalize">
                  {head}
                </TableHead>
              )
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="capitalize">{product.title}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.brand}</TableCell>
            <TableCell className="capitalize">
              {product.category.split("-").join(" ")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ProductsTable as Table };
