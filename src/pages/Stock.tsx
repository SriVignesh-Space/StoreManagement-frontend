import { Button } from "@/components/ui/button";
import type { productType } from "@/components/ui/ProductCard";
import api from "@/lib/axio";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  product: productType;
};

const StockCard = ({ product }: Props) => {
  const [stock, setStock] = useState<number>(product.stockQuantity);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdate = async () => {
    if (stock < 0) {
      toast.error("Stock cannot be negative", {position:"top-center"});
      return;
    }

    try {
      setLoading(true);

      await api.put(`/vinyl/${product.vinylId}`, {
        ...product,
        stockQuantity: stock,
      });

      toast.success("Stock updated successfully", {position : "top-center"});
      window.location.reload();
    } catch (e : unknown) {
      if(e instanceof Error)
      toast.error("Failed to update stock", {position : "top-center"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border flex gap-5 p-4 rounded-2xl shadow-md w-full max-w-2xl items-center">
      
      {/* LEFT: PRODUCT DETAILS */}
      <div className="flex flex-col gap-2 flex-1 text-left">
        <p className="text-sm text-white/40">
          Product ID: <span>{product.vinylId}</span>
        </p>

        <p className="flex">
          <b className="text-redwood-300 w-28">Title</b>
          <span>: {product.title}</span>
        </p>

        <p className="flex">
          <b className="text-redwood-300 w-28">Artist</b>
          <span>: {product.artist}</span>
        </p>

        <p className="flex">
          <b className="text-redwood-300 w-28">Language</b>
          <span>: {product.language}</span>
        </p>

        <p className="flex">
          <b className="text-redwood-300 w-28">Price</b>
          <span>: ₹{product.price}</span>
        </p>

        <p className="flex">
          <b className="text-redwood-300 w-28">Current Stock</b>
          <span>: {product.stockQuantity}</span>
        </p>
      </div>

      {/* RIGHT: UPDATE STOCK */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-sm text-white/60">Update Stock</p>

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border p-2 w-24 rounded text-center bg-transparent"
        />

        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};


const Stock = () => {

  
  const [products, setProducts ] = useState<productType[]>([]);

  useEffect(() => {
    
    const fetchVinyl = async ()=>{
      const response = await api.get("/vinyl/");
      if(response.status != 200){
        toast.error("Something went wrong",{position : "top-center"});
        return;
      }
      console.log(response);
      setProducts(response.data)
    }
    fetchVinyl()

  },[])

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <h1 className="mb-3 text-4xl font-bold text-redwood-400">Stock Details</h1>
      {
        products.map((product) => <StockCard key={product.vinylId} product={product} /> ) 
      }
    </div>
  )
}

export default Stock