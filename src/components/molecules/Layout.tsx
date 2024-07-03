import { Outlet } from 'react-router-dom'
import Navbar from '../ui/navbar'
import { Button } from '@nextui-org/button'

const Layout = () => {
  return (
    <div>
    <Button className='fixed z-50 top-4 right-4' color='secondary'>Login</Button>  
    <Navbar></Navbar>
    <Outlet></Outlet>

    </div>
  )
}

export default Layout