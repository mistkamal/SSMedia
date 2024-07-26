import NewPostForm from './NewPostForm'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Card } from '@nextui-org/card'
import { useState } from 'react'

interface Post {
  description: string,
  image: string,
  title: string,
  name: string
}
const Feed = () => {
  const q = collection(db, "posts")
  const [posts, setPosts] = useState<Post[]>([])

  const getAllPost = async () => {
    let postArray: any[] = []
    const posts: any = getDocs(q).then((docs) => {
      docs.forEach((doc) => {
        postArray.push(doc.data())
      }
      )
      setPosts(postArray)
    })

    console.log(posts)
  }

  setTimeout(() => {
    getAllPost();
  }, 20000);

  return (
    <main className='p-4'>
      <NewPostForm></NewPostForm>
      <div className='w-full min-h-screen flex flex-col justify-center items-center p-8'>
        <div className='grid grid-cols-1 gap-4'>
          {
            posts.map((values, index) => {
              return (
                <Card className='w-[20rem] p-3 bg-violet-200 flex flex-col justify-center items-center' key={index}>
                  <div className='rounded-lg'>
                    <img src={values.image}></img>
                  </div>
                  <p>UserName : {values.name}</p>
                  <p>Title : {values.title}</p>
                  <p>Discription : {values.description}</p>
                </Card>
              )
            })
          }
        </div>
      </div>
    </main>
  )
}

export default Feed