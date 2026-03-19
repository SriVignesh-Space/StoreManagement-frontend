import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import apiAuth from '@/lib/axiosAuth';
import { ListOrderedIcon, LogOutIcon, User, UserIcon } from 'lucide-react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext, type AuthContextType } from '../AuthProvider';


const ProfileDialog = () => {

  const [open,setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext) as AuthContextType;

  const logout = async () => {
    await apiAuth.get("/logout");
    toast.info("Logged Out Successfully", {position : "top-center"})
    auth.setUser(null);
    navigate("/");
  }

  return (
     <DropdownMenu open={open} onOpenChange={setOpen} >
      <DropdownMenuTrigger asChild >

        <User
            className="border-2 rounded-2xl p-2 cursor-pointer hover:scale-90"
            size="3rem"
            onMouseEnter={() => setOpen(true)}
            
          />

      </DropdownMenuTrigger>
      <DropdownMenuContent  onMouseLeave={() => setOpen(false)}
                          onMouseEnter={() => setOpen(true)}
                          >

        <DropdownMenuItem onClick={()=> navigate("/v1/profile")}>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> navigate("/v1/myorders")}>
          <ListOrderedIcon/>
          My Orders
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDialog