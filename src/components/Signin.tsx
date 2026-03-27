import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import apiAuth from "@/lib/axiosAuth"
import { Loader } from "lucide-react"
import {  useState, type ReactElement, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const Signin = () :ReactElement => {

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e : SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = new FormData(e.currentTarget);
      // console.log(form.get("email"), form.get("password"))
      const email = form.get("email") as string
      const password = form.get("password") as string

      try{
        setLoading(true);
        const response = await apiAuth.post("/", {email:email,password : password});
        if(response.status != 200) throw new Error("Login failed");
        toast.success("Login Success", {position : "top-center"})
        setLoading(false);
        navigate("/v1")
      }
      catch(e: unknown){
        if(e instanceof Error){
          console.log("Login Failed" + e.message);
          toast.error("Login Failed", {position : "top-center"});
          setLoading(false);
          navigate("/")
        }
      }

  }

  return (
  
      <main className="relative flex min-h-screen justify-center items-center">
      <Card className="w-full max-w-md" onClick={(e)=> e.stopPropagation()}>
      <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" placeholder="*******" required />
            </div>
            <Button type="submit" className="w-full hover:opacity-50">
              {
                !(loading) ? "Sign In" : <Loader className="size-5 animate-spin"/>
              }
            </Button>
          </div>
        </form> 
      </CardContent>
    </Card>
    </main>
  )
}

export default Signin