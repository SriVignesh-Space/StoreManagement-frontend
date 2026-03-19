import Navbar from '@/components/Navbar'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import  {  useState, type ReactElement } from 'react'
import { Textarea } from '@/components/ui/textarea'
import HeroText from '@/components/ui/HeroText'
import HeroProduct from '@/components/ui/HeroProduct'
import { Mail } from 'lucide-react'
// import api from '@/lib/axio'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'

export type overlapType = "login" | "signup" | null

const Home = () : ReactElement => {

  // const navigate = useNavigate();

  // useEffect(()=>{
  //   const check = async () =>{
  //     try{
  //       const response = await api.get("/customer/me")
  //       // console.log(response)
  //       if(response.status == 200){
  //          navigate("/v1");
  //       }
  //       else
  //           throw new Error("auth failed");
  //     }
  //     catch(e : unknown){
  //       if(e instanceof Error)  
  //           toast("Login to Proceed", {position : "top-center"});
  //     }
  //   }
  //   check();
  // },[])


  const [overlap, setOverlap] = useState<overlapType>(null);

  return (
    <main  className='relative text-redwood-950 dark:text-redwood-200 text-center'>
        <Navbar setOverlap={setOverlap} />
        {/* hero page */}
      <section id='home'>
        {
          (overlap === "login") ?
             (
           <div className='absolute inset-0 backdrop-blur-xs z-20 bg-black/40' onClick={() => setOverlap(null)}>
              <Signin/>
            </div>
          ) :
          (overlap === "signup") ?  
          (
            <div className={`absolute inset-0 backdrop-blur-xs z-20 bg-black/40 transition-opacity duration-1000 ${overlap ? "opacity-100" : "opacity-0"}`} onClick={() => setOverlap(null)}>
              <Signup setOverlap={setOverlap} />
            </div>
          ):<></>
        } 
        <div  className='p-10'>
          <HeroText/>
          <h3 className='text-lg text-redwood-900/60 dark:text-redwood-50/40'>Authentic pressings · Collector favorites · Curated with passion</h3>
            <Button className='my-5' onClick={() => setOverlap("signup")} size="xl">Get Started</Button>
        </div>  
          <div className='border border-redwood-900/30 dark:border-redwood-200/30 w-[80%]  my-10 mx-auto'></div>
      </section>

      {/*  products */}
      <section  id='top-products'>
          <h1 className='text-5xl font-bold m-10'>Top Products</h1>
          <div className='grid grid-cols-3 grid-rows-1 gap-1 place-content-evenly p-10'>
            <HeroProduct setOverlap={setOverlap}/>  
          </div>
          <div className='border border-redwood-900/30 dark:border-redwood-200/30  mt-10 w-[80%] mx-auto'></div>
      </section>

        {/* contact */}
      <section className='flex flex-col justify-center items-center' id='contact'>
        <h1 className='text-5xl font-bold m-10'>Contact Us</h1>
        <div className='grid grid-cols-2   w-[90%]'>
          <div className='p-10 border-r-2 border-redwood-500'>
                  
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="grid gap-2">
                      <Label htmlFor="phone_number">Phone Number</Label>
                      <Input id="phone_number" type="tel" placeholder='+91 1234567890' required />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="query">Query</Label>
                    </div>
                      <Textarea id="query" placeholder="Add your query here.." className='resize-none mb-3' />
                    
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full hover:opacity-50">
                Submit query
              </Button>
            </CardFooter>
           
          </div>
          
          <div className='border-l-2 border-redwood-500'>
            <div>
              <h1 className='text-4xl font-bold mb-5'>Address</h1>
              <p className=' p-4 text-white/70'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, autem.<br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit!<br /> Chennai, Tamil Nadu <br /> India</p>
              <div className='flex gap-4 items-center justify-center'>
              <Mail />
                {/* // instagram */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>

                {/* Youtube */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </main>
  )
}

export default Home