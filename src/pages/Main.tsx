import ProductCard, { type productType } from '@/components/ui/ProductCard'
import api from '@/lib/axio';
import { useEffect, useState, type ReactElement } from 'react'
import { toast } from 'sonner';

type AddType = productType & {
  stockQuantity : number,
  price : number,
  vinylId : string
}

const Main = () : ReactElement => {

  const [proddata, setData] = useState<AddType[]>([]);

    useEffect(()=>{
        const getData=async ()=>{
          try {
            const response = await api.get("/vinyl/")
            if(response.status != 200) 
                throw new Error("Vinyl Get Failed");
            // console.log(response);
            setData(response.data);
          } catch (e : unknown) {
            if(e instanceof Error)
              console.log("Vinyl Get Failed " + e.message);
            toast.warning("Something went wrong !!",{position : "top-center"})
          }
        }

        getData();
    },[])

  return (  
    <main className='text-redwood-400'>
      <h1 className='text-6xl font-bold text-center'>Products</h1>
      <div className='grid grid-cols-3 p-10 gap-4'>
          {
            proddata.map((product, idx) =>{
              return (
              <ProductCard key={idx} vinylId={product.vinylId} title={product.title} artist={product.artist} language={product.language} genre={product.genre} stockQuantity={product.stockQuantity} price={product.price} imageUrl={product.imageUrl} />
              )
            })
          }
      </div>
    </main>
  )
}

export default Main