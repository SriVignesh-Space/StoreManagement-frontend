import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axio";
import { toast } from "sonner";
import type { OrderType } from "./AuthProvider";



// type OrderType = {
//   id: string;
//   customerId: string;
//   orderVinyls: Record<string, number>;
//   status: string;
// };

const OrderCard = ({ order }: { order: OrderType }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus: string) => {
    try {
      setLoading(true);

      await api.put(`/admin/order/${order.orderId}`, {
        status: newStatus,
      });

      setStatus(newStatus);
      toast.success(`Order marked as ${newStatus}`, {
        position: "top-center",
      });
    } catch (e : unknown) {
        if(e instanceof Error)
            toast.error("Failed to update order", {
                position: "top-center",
            });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl p-5 mx-auto flex flex-col gap-3 w-full max-w-5xl shadow-md">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Order ID: {order.orderId}</h1>
        <span className="text-sm text-white/60">Customer: {order.name}</span>
      </div>

      {/* ITEMS */}
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-redwood-300">Items</h2>

        {order.orderItems.map((item) => (
            <div key={item.orderItemId} className="flex justify-between text-white/70">
                <span>{item.vinyl.title}</span>
                <span>Qty: {item.quantity}</span>
            </div>
            ))}
      </div>

      {/* STATUS */}
      <div className="flex justify-between items-center mt-3">
        <span className="font-semibold">
          Status: <span className="text-white/60">{status}</span>
        </span>

        <div className="flex gap-2">
          <Button
            disabled={loading || status === "SHIPPED"}
            onClick={() => updateStatus("SHIPPED")}
          >
            Ship
          </Button>

          <Button
            disabled={loading || status === "DELIVERED"}
            onClick={() => updateStatus("DELIVERED")}
            variant="secondary"
          >
            Deliver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;