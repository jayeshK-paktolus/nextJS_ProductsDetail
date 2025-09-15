import AudienceByAge from "@/components/charts/audience-by-age";
import NewProducts from "@/components/charts/new-products";
import TrafficByDevice from "@/components/charts/traffic-by-device";
import Users from "@/components/charts/users";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="grid w-full grid-cols-1 gap-4 mb-4 xl:grid-cols-2 2xl:grid-cols-3 p-5 mt-16 ">
        <Card className="max-w-none px-3 py-3 h-32 md:h-64 flex items-center justify-between">
          <NewProducts />
        </Card>
        <Card className="max-w-none px-3 py-3 h-32 md:h-64 flex items-center justify-between">
          <Users />
        </Card>
        <Card className="max-w-none px-3 py-3 h-32 md:h-64">
          <AudienceByAge />
        </Card>
        <Card className="max-w-none px-3 py-3 h-auto mb-4">
          <TrafficByDevice />
        </Card>
      </div>
      
    </>
  );
}
