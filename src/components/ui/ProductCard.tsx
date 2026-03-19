import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Button } from './button'
import {  useContext, type Dispatch, type ReactElement, type SetStateAction } from 'react'
import convertImageUrl from '@/lib/imageConvert'
import type { overlapType } from './HeroProduct'
import { Badge } from './badge'
import { BookmarkPlusIcon } from 'lucide-react'
import { AuthContext, type AuthContextType, type UserType } from '../AuthProvider'
import api from '@/lib/axio'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export type productType = {
    title : string ,
    artist : string,
    language : string,
    imageUrl : string,
    genre : string,
    stockQuantity : number,
    price : number,
    vinylId : string,
    setOverlap? : Dispatch<SetStateAction<overlapType>>
}

export type prodType = {
    title : string ,
    artist : string,
    language : string,
    imageUrl : string,
    genre : string,
    stockQuantity? : number,
    price? : number,
    vinylId? : string,
    setOverlap? : Dispatch<SetStateAction<overlapType>>
}

const ProductCard = ({vinylId, title, artist, language, genre, imageUrl, stockQuantity, price ,setOverlap} : productType|prodType) : ReactElement => {

    const auth = useContext(AuthContext) as AuthContextType;
    const user = auth.user as UserType
    const navigate  =  useNavigate();

    const handleAddCart = async () =>{
        try {
            const response = await api.get("/vinyl/addcart",{
                params : {
                    customerId : user?.userId,
                    vinylId : vinylId
                }
            })
            const responseuser  = await api.get("/customer/me");
            const updateuser : UserType = responseuser.data;
            // console.log("Before : ",user)
            auth.setUser ((prev) => ({...prev!, ...updateuser}))
            // console.log("after : ", user)
            
            if(response.status == 200)
                toast.success("Added to Cart", {position : "top-center"})
            else 
                throw new Error("failed to add")
        } catch (e : unknown) {
            if(e instanceof Error){
                // console.log("Failed to AddCart : ",e.message);
            toast.warning("Already in Cart", {position : "top-center"});
            }
        }
    }

  return (  
         <Card className="relative mx-auto text-left w-full rounded-2xl max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={convertImageUrl(imageUrl)}
                alt="vinyl image"
                className="relative aspect-video w-full object-cover rounded-2xl"
                height={"300px"}
                width={"300px"}
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="default">{language}</Badge>
                </CardAction>
                <CardTitle className='text-2xl font-bold text-redwood-400'>{title}</CardTitle>
                {
                    (setOverlap) ? 
                        <CardDescription>
                            <p><b>Artist </b> : {artist}</p>
                            <p><b>Genre </b>: {genre}</p>
                        </CardDescription>
                    :   
                    <CardDescription>
                            <p><b>Artist </b> : {artist}</p>
                            <p><b>Genre </b> : {genre}</p>
                            <p><b>Stock </b> : {stockQuantity}</p>
                            <p><b>Price </b> : {price}</p>
                    </CardDescription>

                }
            </CardHeader>
            <CardFooter className='flex gap-3 justify-center items-center'>
                {
                    (setOverlap) ?
                    <>
                     <Button className='w-full'  onClick={() => {
                        if(user)
                            navigate("/v1")
                        else
                            setOverlap?.("login")
                     }}>Buy Now</Button>
                    </>
                     : (    
                     <>
                     <Button onClick={() => navigate(`/v1/buy`, {
                        state : {
                            order : {
                                [vinylId!] : 1,
                            }
                        }
                     })} className='flex-5' >Buy Now</Button>
                     <Button onClick={handleAddCart}><BookmarkPlusIcon className='size-5'/></Button>
                     </>
                     )
                }
                
            </CardFooter>
    </Card>
  )
}


export default ProductCard