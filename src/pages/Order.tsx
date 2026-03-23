import type { OrderType } from '@/components/AuthProvider';
import OrderCard from '@/components/OrderCard';
import api from '@/lib/axio';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const Order = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/vieworders");
        console.log(res.data)
        setOrders(res.data);
      } catch (e : unknown) {
        if(e instanceof Error)
        toast.error("Failed to fetch orders", {
          position: "top-center",
        });
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='p-5'>
      <h1 className='mb-3 text-4xl text-center font-bold text-redwood-400'>Order Details</h1>
      <div>
          {orders.map((order: OrderType) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
      </div>
    </div>
  )
}

export default Order