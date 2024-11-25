import { HelloClient } from "@/components/hello-client";
import { HelloServer } from "@/components/hello-server";

export default function Home() {
  return (
    <div className="grid place-content-center">
      <HelloServer />
      <HelloClient />
    </div>
  );
}
