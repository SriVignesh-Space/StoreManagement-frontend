import  {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import api from "@/lib/axio";
import {
  AuthContext,
  type AuthContextType,
  type UserType,
} from "./AuthProvider";

type PropType = {
  setOverlap: Dispatch<SetStateAction<boolean>>,
};

const Address = ({ setOverlap }: PropType) => {
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useContext(AuthContext) as AuthContextType;
  const user = auth.user as UserType;
  // const navigate = useNavigate();

  if (user === null) toast.info("Refresh Page something went wrong..");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // console.log(form.get("address"), form.get("country"), form.get("pincode"), form.get("dphone"))

    const updateAddress =
      form.get("address") + "\n";
    const updateCountry = form.get("country");
    const updatePincode = form.get("pincode");

    if(user.addresses && user.addresses?.length >= 5){
      toast.warning("You can't add more than 8 addresses Delete one and Add this", {position : "top-center"});
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/customer/${user.userId}/address`, {
        address: updateAddress,
        country: updateCountry,
        pincode: updatePincode,
      });
      const responseuser = await api.get("/customer/me");
      const updateuser: UserType = responseuser.data;

      auth.setUser((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          ...updateuser,
        };
      });

      if (response.status === 200)
        toast.success("Address Added successfully", {
          position: "top-center",
        });
      setLoading(false);
      setOverlap(false);
    } catch (e: unknown) {
      if (e instanceof Error)
        toast.error("Can't remove Address", { position: "top-center" });
    }
  };

  return (
    <main className="relative min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Add New Address</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="address">Address</Label>
                </div>
                <Textarea
                  name="address"
                  id="address"
                  placeholder="Add your delivery Address."
                  className="resize-none"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="country">Country</Label>
                </div>
                <Input id="country" name="country" type="text" required />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="pincode">PIN Code</Label>
                </div>
                <Input
                  id="pincode"
                  name="pincode"
                  type="tel"
                  minLength={6}
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full hover:opacity-50">
                {!loading ? (
                  "Add Address"
                ) : (
                  <Loader className="size-5 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Address;
