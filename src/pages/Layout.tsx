import Navbar from '@/components/Navbar'
import  { type ReactElement } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () : ReactElement => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layout