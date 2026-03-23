import Navbar from '@/components/Navbar'
import { type ReactElement } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () : ReactElement => {

    const navigate = useNavigate();

  return (
    <div>
        <Navbar />
        <div  className='mx-10 flex  border-3 rounded-2xl'>
            <aside className='flex-1 flex flex-col gap-2 justify-start items-center mb-10 mt-5 mx-2'>
                <div className='border-2 w-full text-center cursor-pointer rounded-md p-3 hover:bg-redwood-700' onClick={() => navigate("/v1/admin")}><h1>Stock Details</h1></div>
                <div className='border-2 w-full text-center  cursor-pointer rounded-md p-3 hover:bg-redwood-700' onClick={() => navigate("/v1/admin/order")}><h1>Orders</h1></div>
                <div className='border-2 w-full text-center  cursor-pointer rounded-md p-3 hover:bg-redwood-700' onClick={() => navigate("/v1/admin/addvinyl")}><h1>Add Vinyl</h1></div>
            </aside>
            <div className='flex-3 border'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default AdminLayout