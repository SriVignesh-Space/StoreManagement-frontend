import { AuthContext, type AuthContextType, type UserType } from "@/components/AuthProvider"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import convertImageUrl from "@/lib/imageConvert";
import { useContext, useEffect } from "react"
import { toast } from "sonner";

const MyOrders = () => {

  const auth = useContext(AuthContext) as AuthContextType;
  const user = auth.user as UserType;

  useEffect(() => {
    if(!user){
      toast.error("Please login to proceed", {position: "top-center"})
      return;
    }
  },[user])


  return (
    <div className="text-redwood-200 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">My Orders</h1>
      <div className="w-full max-w-xl flex justify-center items-center m-2">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <ItemGroup className="gap-4">
            {user.orders.length > 0  && user.orders.map((order) => (
              order.orderItems.map((product) => (
                <Item key={order.orderId + "#" +product.vinyl.vinylId} variant="outline" role="listitem">
                  <ItemMedia variant="image">
                    <img
                      src={convertImageUrl(product.vinyl.imageUrl)}
                      alt="image"
                      width={32}
                      height={32}
                      className="object-cover grayscale"
                    />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {product.vinyl.title} -{" "}
                      <span className="text-muted-foreground">
                        {product.vinyl.artist}
                      </span>
                    </ItemTitle>
                    <ItemDescription>Language : {product.vinyl.language}</ItemDescription>
                    <ItemDescription>quantity : {product.quantity}</ItemDescription>
                    <ItemDescription>Order Id : {order.orderId}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none text-center">
                    <ItemDescription>{order.status}</ItemDescription>
                  </ItemContent>
              </Item>
              ))
            ))}
          </ItemGroup>
        </div>
      </div>
    </div>
  );
}

export default MyOrders