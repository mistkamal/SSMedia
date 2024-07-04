import { Outlet } from 'react-router-dom'
import Navbar from '../ui/navbar'
import { Button } from '@nextui-org/button'
import { LogOut } from 'lucide-react'
import { auth } from '../../lib/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const Layout = () => {
  const navigate = useNavigate()
  async function logout() {
    signOut(auth).then(() =>
      navigate('/login')
    )
  }

  return (
    <div>
      <Button className='fixed z-50 top-4 right-4' color='secondary' onClick={logout}><LogOut className='h-5'></LogOut>LogOut</Button>
      <Navbar></Navbar>
      <Outlet></Outlet>

    </div>
  )
}

export default Layout