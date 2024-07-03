import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/molecules/Layout'
import Feed from './components/molecules/Feed'
import Chats from './components/molecules/Chats'
import Chat from './components/molecules/Chat'
import Login from './components/molecules/Login'
import Register from './components/molecules/Register'
import Account from './components/molecules/Account'

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<Feed />} />
          <Route path="chat" element={<Chats />} />
          <Route path="/chat/:chatid" element={<Chat />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
