import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axio";
import { Loader } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddVinyl = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data = {
      title: form.get("title") as string,
      artist: form.get("artist") as string,
      language: form.get("language") as string,
      imageUrl: form.get("imageUrl") as string,
      genre: form.get("genre") as string,
      price: Number(form.get("price")),
      stockQuantity: Number(form.get("stockQuantity")),
    };

    try {
      setLoading(true);

      const response = await api.post("/vinyl/", data);

      if (response.status !== 200) {
        throw new Error("Failed to add vinyl");
      }

      toast.success("Vinyl added successfully", { position: "top-center" });
      navigate("/v1/admin");
    } catch (e : unknown) {
      if(e instanceof Error)
      toast.error("Failed to add vinyl", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-black/40 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add New Vinyl</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Title</Label>
                <Input name="title" required />
              </div>

              <div className="grid gap-2">
                <Label>Artist</Label>
                <Input name="artist" required />
              </div>

              <div className="grid gap-2">
                <Label>Language</Label>
                <Input name="language" required />
              </div>

              <div className="grid gap-2">
                <Label>Image URL</Label>
                <Input name="imageUrl" required />
              </div>

              <div className="grid gap-2">
                <Label>Genre</Label>
                <Input name="genre" required />
              </div>

              <div className="grid gap-2">
                <Label>Price</Label>
                <Input name="price" type="number" required />
              </div>

              <div className="grid gap-2">
                <Label>Stock Quantity</Label>
                <Input name="stockQuantity" type="number" required />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Add Vinyl"
                )}
              </Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddVinyl;