import { useContext, type ReactElement } from 'react'
import { AuthContext, type AddressType, type AuthContextType, type UserType } from './AuthProvider'
import { X } from 'lucide-react'
import api from '@/lib/axio'
import { toast } from 'sonner'
import { Button } from './ui/button'

const AddressCard = ({address, id,  country, pincode} : AddressType ) : ReactElement => {

  const auth = useContext(AuthContext) as AuthContextType;
  const user = auth.user as UserType;

  const removeItem = async (id : string) =>{
    try{
      const response = await api.delete("/customer/removeaddress",{
        params : {
          customerId : user.userId,
          addressId: id
        }
      })
      // console.log(response)
      const responseuser  = await api.get("/customer/me");
      const updateuser : UserType = responseuser.data;

      console.log(updateuser, user, id);

      auth.setUser((prev) => {
        if(!prev) return prev;
        
        return {
          ...prev,
          ...updateuser
        }
      });
    
      if(response.status === 200)
        toast.success("Address removed successfully", {position : "top-center"});
    }
    catch(e:unknown){
      if(e instanceof Error)  
        toast.error("Can't remove Address", {position : "top-center"});
    }
  }

  return (
    <div className='border-2 rounded-2xl hover:bg-accent relative m-5'>
      <p>{address}</p>
      <p>{country} - {pincode}</p>
      <span  className="absolute top-3 right-2 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white/20 text-[4px] text-white hover:scale-90 text-center">
                  <Button variant="light" onClick={() => removeItem(id)}><X className='size-4 text-center' /></Button>
              </span>
    </div>
  )
}

export default AddressCard