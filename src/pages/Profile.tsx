import Address from "@/components/Address";
import AddressCard from "@/components/AddressCard";
import {
  AuthContext,
  type AddressType,
  type AuthContextType,
  type UserType,
} from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import api from "@/lib/axio";
import { PlusCircleIcon } from "lucide-react";
import { useContext,  useState, type ReactElement, type SubmitEvent } from "react";
import { toast } from "sonner";

const Profile = () : ReactElement => {
  const auth = useContext(AuthContext) as AuthContextType;
  const user = auth.user as UserType;
  const [edit, setEdit] = useState<boolean>(true);
  const [overlap , setOverlap ] = useState<boolean>(false);

  const [username, setUsername] = useState<string>(user.username);
  const [phone, setPhone] = useState<string>(user.phone?? "");

  if(user == null){
    toast.info("Refresh the page something went wrong", {position : "top-center"});
    return <></>;
  }


  // console.log(addresses)

  const handleEdit = () => {
    toast.info("Edit option Enabled", {position : "top-center"})
    setEdit(false);
  }

  const handleSave = async (e : SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new FormData(e.currentTarget);

    const username = form.get("username");
    const phone = form.get("phone");
    // console.log(username, phone);
    // console.log({
    //   ...user, username : username, phone : phone
    // })

    const response = await api.put(`/customer/${user.userId}`, {
      ...user, username : username, phone : phone
    })

    if(response.status == 200){
      toast.success("User Updation Success", {position : "top-center"});
    }
    else{
      throw new Error("User not saved");
    }
    } catch (e : unknown) {
      if(e instanceof Error){
        toast.error("User Updation failed", {position : "top-center"});
        console.log(e.message);
      }
    }

    setEdit(true);
  } 
  return (
    <div className="text-redwood-950 flex flex-col items-center dark:text-redwood-200 text-center">
      {
        (overlap) ? (
          <div className='absolute inset-0 backdrop-blur-xs z-20 bg-black/40' onClick={() => setOverlap(false)}>
              <Address setOverlap={setOverlap} />
            </div>
        ) : <></>
      }
      <h1 className="text-5xl font-b  old text-center">My Profile</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-3 justify-center items-center m-10">
        <div className="w-full max-w-xl p-3 flex gap-3 justify-center items-center">
          <label htmlFor="username" className="text-3xl font-bold">
            Name :
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 flex-1 rounded p-2 text-white/70"
            disabled={edit}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="w-full max-w-xl p-3 flex gap-3 justify-center items-center">
          <label htmlFor="phone" className="text-3xl font-bold">
            Phone :
          </label>
          <input
            type="text"
            name="phone"
            id="username"
            className="border-2 flex-1 rounded p-2 text-white/70"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={edit}
          />
        </div>
      
        <div className="flex gap-4 m-10">
          <Button className="flex-1 w-2xs" type="submit" disabled={edit}>Save</Button>
          <Button className="flex-1" type="button"  onClick={handleEdit} variant="outline">Edit</Button>
        </div>
      </form>

      <div className="max-w-xl w-full text-center border-2 rounded-2xl p-5">
          <div className="flex justify-center items-center p-2 m-4">
              <h1 className="text-3xl flex-1 font-bold">Address</h1>  

              <Button variant="outline" onClick={() => setOverlap(true)}  >
                <PlusCircleIcon className="size-5 top-1 right-1 hover:scale-90" />
              </Button>
          
          </div>
          <div >
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((address: AddressType, idx) => {
                return (
                  <AddressCard
                    key={idx}
                    id={address.id}
                    address={address.address}
                    country={address.country}
                    pincode={address.pincode}
                  />
                );
              })
            ) 
            : 
              <div className="text-white/70">No Address Found..</div>
            }
          </div>
          <p className="text-right text-white/40">*Add upto 5 address</p>
        </div>

    </div>
  );
};

export default Profile;
