import { useContext, type Dispatch, type ReactElement, type SetStateAction } from 'react'
import { Button } from './ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu'
import { ShoppingBagIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import GradientText from './ui/GradientText'
import { AuthContext, type AuthContextType, type UserType } from './AuthProvider'
import ProfileDialog from './ui/ProfileDialog'

type OverlayType = "login" | "signup" | null;

type propType = {
  setOverlap? : Dispatch<SetStateAction<OverlayType>>
}

const Navbar = ({setOverlap} : propType) : ReactElement => {

  const auth = useContext(AuthContext) as AuthContextType;
  const user : UserType | null = auth.user 
  const navigate = useNavigate();


  // console.log("NAV :: ", user)

  return (
    <nav className="p-10 text-redwood-950 dark:text-redwood-50 ">
      <div className="text-6xl p-4 rounded-2xl ring-2 dark:ring-redwood-100/40 ring-redwood-900  font-bold  flex justify-between items-center">
        <Link to={"/"}>
          <GradientText>VinylVault</GradientText>
        </Link>
        {!user ? (
          <>
            <div className="ring-1 text-redwood-100 dark:ring-redwood-100/40 ring-redwood-950 rounded cursor-pointer hover:scale-150">
              <NavigationMenu className="scroll-smooth">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="#home">Home</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="#top-products">Top Products</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <a href="#contact">Contact Us</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={() => setOverlap?.("signup")}
                size="lg"
              >
                Sign Up
              </Button>
              <Button
                variant="outline"
                className="hover:scale-95"
                onClick={() => setOverlap?.("login")}
                size="lg"
              >
                Login
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4 text-redwood-950 dark:text-redwood-500 text-center">
              {
                user.role == "USER" &&
                <Button variant="default" className='font-bold h-10 rounded-xl' onClick={() => navigate("/v1")}>Shop Now</Button>
              }
              {
                user.role == "ADMIN" &&
                <Button variant="default" className='font-bold h-10 rounded-xl' onClick={() => navigate("/v1/admin")}>Dashboard</Button>
              }
              <div className="relative">
                <ShoppingBagIcon
                  className="border-2 cursor-pointer rounded-2xl p-2 hover:scale-90"
                  size="3rem"
                  onClick={() => navigate("/v1/cart")}
                />

                { user && user.cart.length > 0 && 
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[4px] text-white">
                  {user.cart.length}
                  </span>
                } 
              </div>
             <ProfileDialog />
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar   