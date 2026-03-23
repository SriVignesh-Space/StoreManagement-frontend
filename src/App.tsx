import { ThemeProvider } from "./components/theme-provider"
import { Routes,Route } from "react-router-dom"

import Home from "@/pages/Home"
import Layout from "@/pages/Layout"
import ElementNotFound from "./pages/ElementNotFound"
import AuthProvider from "./components/AuthProvider"
import Main from "./pages/Main"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import MyOrders from "./pages/MyOrders"
import Checkout from "./pages/Checkout"
import AdminProvider from "./components/AdminProvider"
import AdminLayout from "./pages/AdminLayout"
import Stock from "./pages/Stock"
import Order from "./pages/Order"
import AddVinyl from "./pages/AddVinyl"

const App = () => {
  return (
    <>
    <div className="hidden min-[830px]:flex flex-col min-h-screen ">
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/v1" element={<Layout/>}>
            <Route index element={<Main />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="myorders" element={<MyOrders/>} />
            <Route path="buy" element={<Checkout/>} />
          </Route>
            <Route path="/v1/admin" element={
                <AdminProvider>
                  <AdminLayout/>
                </AdminProvider>}>
                <Route index element={<Stock />}/>
                <Route path="order" element={<Order />}/>
                <Route path="addvinyl" element={<AddVinyl />}/>
            </Route>
          <Route path="*" element={<ElementNotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
    </div>
    <div className="max-[830px]:flex hidden min-h-screen justify-center items-center">
      <h1 className="text-5xl font-bold text-center">See in big screen..</h1>
    </div>
    </>
  )
}

export default App