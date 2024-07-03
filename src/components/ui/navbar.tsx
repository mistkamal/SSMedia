import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='w-[340px] h-14 rounded-full bg-zinc-200 opacity-90 backdrop-blur-lg flex justify-center items-center fixed bottom-0 z-50'>
        <ul className='w-full flex justify-around'>
          <Link to='/'><li>Feed</li></Link>
          <Link to='/chat'><li>Chat</li></Link>
          {/* <Link to='/chat:chatid'><li>Chats</li></Link> */}
          <Link to='/account'><li>Account</li></Link>
        </ul>
    </nav>
  );
}
