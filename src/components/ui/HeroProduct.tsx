import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import ProductCard from './ProductCard'
import api from '@/lib/axio'

export type productType = {
    title : string ,
    artist : string,
    language : string,
    imageUrl : string,
    genre : string,
}


export type overlapType = "login" | "signup" | null

type actionProp  ={
  setOverlap : Dispatch<SetStateAction<overlapType>>
}

const HeroProduct = ({setOverlap} : actionProp) => {

  const [products,setProducts] = useState<productType[]>([]);
  


  useEffect(()=>{

    const getData = async () =>{
    try{
      const data = await api.get("/vinyl/")
      const threeData = data.data.slice(0,3);
      // console.log(data.data);
      setProducts(threeData);
    }
    catch(e : unknown) {
      if(e instanceof Error)
        console.log("Product fetch failed : ", e.message);
      else
        console.log("Product load failed");
    }
  }

   getData()
  }, [])

  return (
    <>
        {
          products.map((product, idx) => {
            return (
              <ProductCard key={idx} title={product.title} genre={product.genre} imageUrl={product.imageUrl} language={product.language} artist={product.artist} setOverlap={setOverlap} />
            )
          })
        }
    </>
  )
}

export default HeroProduct