import { AuthContext, type AuthContextType, type UserType } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { productType } from '@/components/ui/ProductCard';
import RadioCard from '@/components/ui/RadioCard';
import api from '@/lib/axio';
import convertImageUrl from '@/lib/imageConvert';
import { Loader2 } from 'lucide-react';
import  { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

type OrderType = Record<string, number>

type State = {
  order : OrderType
}

const Checkout = () => {
  
  const location = useLocation();
  const {order} : State = location.state;
  console.log(order)

  const [prod, setProd] = useState<productType[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const navigate = useNavigate();
  

  const auth = useContext(AuthContext) as AuthContextType;
  const user = auth.user as UserType

  useEffect(()=>{
    if(!order){
      toast.error("Something went wrong! Can't fetch Orders");
      navigate("/v1");
      return;
    }
    fetchData();

},[order,navigate,user]);


    const fetchData = async () => {
      try {
        const ids = Object.keys(order);

        const responses = await Promise.all(
          ids.map((id) => api.get(`/vinyl/${id}`))
        );

        const products : productType[] = responses.map((res) => res.data);
        setProd(products);
      } catch (e) {
        if (e instanceof Error) toast.error(e.message);
      }
    };


  // const fetchData = async ()=>{
  //   try{
  //     const response = await api.get(`/vinyl/${order.id}`);
  //     const product : productType = response.data;
  //     if(product == null) throw new Error("Something went wrong");
  //     setProd(product)
  //   }
  //   catch(e: unknown){
  //     if(e instanceof Error){
  //       toast.error(e.message);
  //     }
  //   }
  // }



  const [selectAddress , setAddress] = useState<string>("");
  const [phone, setPhone ] = useState<string>();

  const placeOrder = async () => {
    setLoading(true);
    try{
    if (!order) {
      toast.error("Invalid product");
      setLoading(false);
      return;
    }
    
    if (!selectAddress || !phone) {
      toast.error("Fill the Required Details",{position : "top-center"})
      setLoading(false);
      return
    }

      const response = await api.post("/customer/order", {
        customerId: user.userId,
        addressId : selectAddress,
        phone: phone,
        orderVinyls :  order
      })
    console.log(response)
    if(response.status == 200){
      toast.success("Order Placed Successfully",{position:"top-center"})
          setLoading(false);
      navigate("/v1/myorders"); 
    }
    else throw new Error("Something went wrong");
    }
    catch(e : unknown){
      if(e instanceof Error) 
      {
        toast.error("Can't place Order " + e.message ,{position : "top-center"});
            setLoading(false);
        navigate("/")
      }
    }
    setLoading(false);
  }

  const total = prod.reduce((sum, p) => {
      const qty = order[p.vinylId] || 0;
      return sum + p.price * qty;
    }, 0);

  return (
    <div className='flex mx-10 text-redwood-200  gap-2 justify-center'>
        <div className='w-1/2 text-center border-2 font-bold text-2xl rounded-2xl'>
            <h1 className='m-4'>Product Details</h1>
              { prod.map((p)=>
                <div key={p.vinylId} className='flex flex-col items-center justify-center gap-5 m-3'>
                  <div className='border-2 w-full max-w-xl flex p-3 rounded-2xl items-center justify-center gap-5 m-3'>
                  <div className='w-64 h-64'>
                      <img src={convertImageUrl(p.imageUrl)} alt="vinyl image" className='object-cover rounded-2xl' />
                  </div>
                  <div className='text-white/50 text-xl text-left font-medium'>
                      <div className="space-y-2">
                          <p className="flex">
                            <b className="text-redwood-300 w-32">Title</b>
                            <span>: {p.title}</span>
                          </p>

                          <p className="flex">
                            <b className="text-redwood-300 w-32">Artist</b>
                            <span>: {p.artist}</span>
                          </p>

                          <p className="flex">
                            <b className="text-redwood-300 w-32">Genre</b>
                            <span>: {p.genre}</span>
                          </p>

                          <p className="flex">
                            <b className="text-redwood-300 w-32">Language</b>
                            <span>: {p.language}</span>
                          </p>

                          <p className="flex">
                            <b className="text-redwood-300 w-32">Quantity</b>
                            <span>: {order[p.vinylId]}</span>
                          </p>

                          <p className="flex">
                            <b className="text-redwood-300 w-32">Price</b>
                            <span>: {p.price}</span>
                          </p>
                        </div>
                      </div>
                  </div>
                </div>
              )
                }
        </div>
        <div className='w-1/2 text-center border-2 rounded-2xl flex flex-col items-center'>
            <h1 className='font-bold text-2xl m-5'>Checkout Details</h1>
            <div className="max-w-xl w-full text-center border-2 rounded-2xl p-5">
                  <div className="flex justify-center items-center p-2">
                      <h1 className="text-xl text-left flex-1 font-bold">Select Address</h1>  

                      <Button variant="outline" onClick={()=> navigate("/v1/profile")} >
                        New
                      </Button>
                  
                  </div>
                  <div className='flex justify-center items-center'>
                    {user.addresses && user.addresses.length > 0 ? 
                          <RadioCard addresses={user.addresses} selectAddress={selectAddress} setAddress={setAddress}/>
                        
                    : 
                      <div className="text-white/70">No Address Found..</div>
                    }
                  </div>
                </div>
            <div className='max-w-xl w-full m-3'>
               <h1 className="text-xl text-left flex-1 font-bold m-2">Delivery Phone Number</h1> 
                <Input type='tel' onChange={(e) => setPhone(e.target.value) } placeholder='+91 1234567890' required/>
            </div>
            <div className='max-w-xl w-full flex flex-col justify-center items-center mb-3'>
                <h1 className="text-xl text-left flex-1 font-bold mt-3">Total : <span className='font-medium text-white/60'>{total}</span> </h1>
                  <p className='text-white/30 m-1 '>*Cash on Delivery Applied</p>
                <Button onClick={placeOrder} disabled={loading}>{
                  loading ? <Loader2  className='animate-spin'/> : <span>Place Order</span>
                  }</Button>
            </div>
        </div>
    </div>
  )
}

export default Checkout