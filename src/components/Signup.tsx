import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axio"
import { Loader } from "lucide-react"
import { useState,  type Dispatch,  type ReactElement, type SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import type { overlapType } from "./ui/HeroProduct"


type propType = {
  setOverlap : Dispatch<SetStateAction<overlapType>>
}

const Signup = ({setOverlap} : propType) : ReactElement => {



  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const registerUser = async (name : string, email : string, password : string, mobile : string) =>{
    const response = await api.post("/customer/add",{
      name: name,
      email : email,
      password : password,
      phone : mobile,
      address : []
    })
    if(response.status != 200) throw new Error("SignUp failed");
    console.log(response);
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const form = new FormData(e.currentTarget);
      
      const username = form.get("username") as string;
      const email = form.get("email") as string;
      const mobile = form.get("phone") as string;
      const password = form.get("password") as string;
      console.log(form.get("username"), form.get("email"), form.get("phone"), form.get("password"))

      try{
        setLoading(true)
        // registerUser(name.current.value, email.current.value, password.current.value, mobile.current.value)
        await registerUser(username, email, password, mobile)
        toast.success("Registration success..,  Please Login", {position : "top-center"})
        setLoading(false);
        navigate("/") 
      }
      catch(e : unknown){
        if(e instanceof Error)
          console.log("error in sign up",e.message);

        toast.error("Registration failed", {position : "top-center"})
        setLoading(false);
        navigate("/")
      }
      setOverlap("login");
    };



  return (
    <div className="absolute inset-0 backdrop-blur-xs bg-black/40" >
    <main className="min-h-screen relative flex justify-center items-center" >
      <Card className="w-full max-w-md" onClick={(e)=> e.stopPropagation()}>
      <CardHeader>
        <CardTitle>Sign Up to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text"  required />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="grid gap-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" name="phone" type="tel"  required />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password"  type="password" placeholder="*******" required />
            </div>

            <Button type="submit" disabled={loading} className="w-full hover:opacity-50">
              {
                !(loading) ?" Sign Up ": <Loader className="size-5 animate-spin" />
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </main>
    </div>
  )
}

export default Signup