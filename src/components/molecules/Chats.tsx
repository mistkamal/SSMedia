import { Button, Card, Input, ScrollShadow } from '@nextui-org/react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { SendIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { auth, db } from '../../lib/firebase'

type ChatList = {
  message: string,
  sender: string,
  reciever: string
}

const Chats = () => {
  const [message, setMessage] = useState("")
  const [currentChat, setcurrentChat] = useState("")
  const [specificList, setspecificList] = useState<ChatList[]>([])
  const [chatList, setChatList] = useState<ChatList[]>([])


  async function addMessage() {
    const messageRef = collection(db, "chats")
    if (auth.currentUser) {
      await addDoc(messageRef, {
        message: message,
        sender: auth.currentUser.email,
        reciever: currentChat
      })
    }
    else {
      console.error('You are not logged in!')
    }
  }


  useEffect(() => {
    async function getMessages() {
      console.log("sss1")
      let list1: any[] = []
      if (auth.currentUser) {
        //const q = query(collection(db, "chats"), where("sender", "==", auth.currentUser.email), where("reciever", "==", "example3@gmail.com"));
        const q = query(collection(db, "chats"), where("sender", "==", auth.currentUser.email));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            //console.log(doc.data());
            list1.push(doc.data())
          })

          //let filterlist = list1.filter(()=>{
          //})
          setChatList(list1)
        });
      }
      else {
        console.error('sign in')
      }
    }

    getMessages()
  }, [])

  console.log(specificList)

  async function getSpecificMessage(current: string) {
    console.log(current)
    let list: any[] = []
    if (auth.currentUser) {
      const q = query(collection(db, "chats"), where("sender", "==", auth.currentUser.email), where("reciever", "==", current));
      //const q = query(collection(db, "chats"), where("sender", "==", auth.currentUser.email));
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list.push(doc.data())
        })
        setspecificList(list)

      });
    }
    else {
      console.error('sign in')
    }
  }

  return (
    <>
      <aside className='fixed h-screen left-0 w-1/4 bg-purple-300 py-8 px-4'>
        <h1 className='font-bold text-purple-500 text-2xl my-4'>Chats</h1>
        <ScrollShadow className='h-screen w-full'>
          {
            chatList.map((value: ChatList, index) => {
              return (
                <Card className='p-4 m-3 hover:bg-purple-100 transition-all hover:cursor-pointer' key={index} isPressable onClick={() => {

                  setcurrentChat(value.reciever)
                  getSpecificMessage(value.reciever)
                  console.log(specificList)
                }}>
                  <h4 className='font-semibold text-lg'>{value.reciever}</h4>
                  <p className='font-light'>{value.message}</p>
                </Card>
              )
            })

          }
        </ScrollShadow>
      </aside>

      <main className='fixed h-[100dvh] w-3/4 p-8 right-0 bg-blue-400'>
        <h2 className={`text-lg font-semibold text-white`}>{currentChat}</h2>
        <div className="flex justify-center items-center w-full">
          <Input className='w-1/2 fixed bottom-20' onChange={(e) => {
            setMessage(e.target.value)
            console.log(message)
          }}>
          </Input>
          <Button isIconOnly className="fixed bottom-20 right-24" onClick={() => addMessage()}>
            <SendIcon></SendIcon>
          </Button>
        </div>
        <section className="h-[70%] w-full">
          <ScrollShadow className="h-full w-full bg-red">
            {
              specificList.map((value:ChatList,index) => {
                return (
                  <Card className="max-w-[80%] min-w-40 p-4" key={index}>
                    <h4 className=" font-bold my-1">{value.reciever}</h4>
                    <p>{value.message}</p>
                  </Card>
                )
              })
            }

          </ScrollShadow>
        </section>
      </main>
    </>
  )
}

export default Chats