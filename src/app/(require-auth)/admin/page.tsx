import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddProductForm from "@/components/ui/add-product-form";
import Navbar from "@/components/navbar";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <Navbar />
      <AddProductForm />
    </div>
  );
}
