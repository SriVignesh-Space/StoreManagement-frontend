import api from '@/lib/axio'
import Home from '@/pages/Home'
import { createContext, useEffect, useState, type Dispatch, type ReactElement, type ReactNode, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { productType } from './ui/ProductCard'


// {"addresses":[],
//   "cart":[{"cartId":103}],
//   "email":"a@a.com","orders":[],
//   "phone":"1231",
//   "role":"USER",
//   "userId":"47d2f091-72d4-413e-84a0-c65d4c939ab7",
//   "username":"a"}

type propType = {
    children : ReactNode | ReactNode[]
}

type CartType = {
  cartId : number,
}

export type AddressType = {
  id : string,
  address : string,
  country : string,
  pincode : string
}

export type UserType = {
  email : string,
  username : string,
  role : string,
  userId : string, 
  phone? : string, 
  addresses? : AddressType[],
  cart : CartType[],
  orders : OrderType[]
}

type OrderItemType = {
  orderItemId : string,
  quantity : number,
  vinyl : productType
}

export type OrderType = {
  orderId : string,
  orderItems : OrderItemType[],
  status: string,
  phone : string,
  name? : string
}

export interface AuthContextType {
  user : UserType | null,
  setUser : Dispatch<SetStateAction<UserType | null>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children} : propType ) : ReactElement => {

  const [status, setStatus] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const check = async () =>{
      try{
        const response = await api.get("/customer/me")
        // console.log(response)
        if(response.status == 200){
          setStatus(true);
          setUser(response.data);
        }
        else
            throw new Error("auth failed");
      }
      catch(e : unknown){
        if(e instanceof Error)  
            toast("Login to Proceed", {position : "top-center"});
            navigate("/");
      }
    }
    check();
  },[navigate])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {
        (status) ? children : <Home />
      }
    </AuthContext.Provider>
  )
}

export default AuthProvider