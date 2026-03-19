/* eslint-disable react-hooks/exhaustive-deps */
// import { AuthContext, type AuthContextType, type UserType } from '@/components/AuthProvider'
import { AuthContext, type AuthContextType, type UserType } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemDescription, ItemGroup,ItemTitle } from '@/components/ui/item'
import type { productType } from '@/components/ui/ProductCard';
import api from '@/lib/axio';
import convertImageUrl from '@/lib/imageConvert';
import { Minus, Plus, X } from 'lucide-react';
import  { useContext, useEffect, useState, type ReactElement } from 'react'
import {   useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type CartType = productType & {quantity : number}

const Cart = () : ReactElement => {

  const [mycart,setMyCart] = useState<CartType[]>([]);
  const auth = useContext(AuthContext) as AuthContextType;
  const user = auth.user as UserType;

  if(user === null) toast.info("Refresh Page something went wrong..")
    
  const navigate  = useNavigate();

  const Total = mycart.reduce((sum, item ) => sum + (item.price ?? 0) * item.quantity, 0);
 
  useEffect(()=>{

    if (!user){
      toast.info("Something went wrong", {position : "top-center"} )
      navigate("/")
      return;
    } 

    const fetchCart = async () =>{
     try{
       const response = await api.get("/vinyl/getcart",{
        params:{
          customerId : user.userId
        }
      })
      setMyCart(response.data.map((item : productType) => ({
        ...item,
        quantity : 1
      })));
      if(response.data.length === 0){
        toast.info("No Items in Cart.. Shop Now", {position : "top-center"})
        navigate("/v1")
      }
      // console.log(response.data)
     }
     catch(e:unknown){
      if(e instanceof Error) toast.error("Can't fetch Cart", {position : "top-center"})
     }
    }

    fetchCart()

  },[navigate,user ,user.userId])
  
  const increase = (id: string) => {
      setMyCart(prev =>
        prev.map(item =>
          item.vinylId === id && item.quantity + 1 <= item.stockQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

  const decrease = (id: string) => {
    setMyCart(prev =>
      prev.map(item =>
        item.vinylId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItem = async (productId : string) =>{
    try{
      const response = await api.get("/vinyl/deletecart",{
        params : {
          customerId : user.userId,
          vinylId: productId
        }
      })


      const responseuser  = await api.get("/customer/me");
      const updateuser : UserType = responseuser.data;

      auth.setUser((prev) => {
        if(!prev) return prev;
        return {
          ...prev!, cart : updateuser.cart
        }
      });
    
      if(response.status === 200)
        toast.success("Cart Item removed successfully", {position : "top-center"});
    }
    catch(e:unknown){
      if(e instanceof Error)  
        toast.error("Can't remove Item", {position : "top-center"});
    }
  }

  return (
    <div className='flex flex-col gap-10 justify-center items-center mb-10 text-redwood-400'>
      <h1 className='text-5xl font-bold text-center text-redwood-400'>My Cart</h1>
       <div className="flex w-full max-w-xl flex-col gap-6">
      <ItemGroup className="gap-4 ">
        {mycart.map((product) => (
          <Item key={product.title} variant="outline" className='relative' role="listitem">
                <img
                  src={convertImageUrl(product.imageUrl)}
                  alt={product.title}
                  width={128}
                  height={128}
                  className="object-cover rounded-2xl"
                />
              <ItemContent>
                <ItemTitle className="font-bold capitalize line-clamp-1 text-2xl">
                  {product.title}
                </ItemTitle>
                <ItemDescription className='capitalize'>
                  <b>Artist : </b ><span>{product.artist}</span>
                  <br />
                  <b>Language : </b><span>{product.language}</span>
                  <br />
                  <b>Genre : </b><span>{product.genre}</span>
                  <br />
                  <b>Price : </b><span>{product.price}</span>
                  <br />
                  <b>Available : </b><span>{product.stockQuantity}</span>
                </ItemDescription>
              </ItemContent>
              <ItemContent className="p-10">
                <ItemDescription className='text-lg'><b>Quantity : </b><span className='m-2'>{product.quantity}</span></ItemDescription>
                <ItemDescription className='flex gap-2 m-1'>
                  <Plus className='border-2 hover:scale-90' onClick={() => increase(product.vinylId)}/>
                  <Minus className='border-2 hover:scale-90' onClick={() => decrease(product.vinylId)}/>
                </ItemDescription>
              </ItemContent>
              <span onClick={() => removeItem(product.vinylId)} className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white/20 text-[4px] text-white hover:scale-90 text-center">
                  <X className='size-4 text-center' />
              </span>
          </Item>
        ))}
      </ItemGroup>
    </div>
    <div className='flex flex-col items-center justify-center-safe'>
      <div className='font-bold'><b>Cart Value : </b><span className='text-white/50 font-medium'>{Total}</span></div>
      <Button
        variant="default"
        className="m-3"
        onClick={() => {
          if (mycart.length === 0) {
            toast.error("Cart is empty");
            return;
          }

          const order = mycart.reduce((acc, item) => {
            acc[item.vinylId] = item.quantity;
            return acc;
          }, {} as Record<string, number>);

          navigate("/v1/buy", {
            state: { order },
          });
        }}
      >
        Place Order
      </Button>
    </div>
    </div>
  )
}

export default Cart
