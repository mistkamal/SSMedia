import { Button } from '@nextui-org/button'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new GoogleAuthProvider();

interface LoginFormInsterface {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<LoginFormInsterface>()

  async function onSubmit(values: LoginFormInsterface) {
    await signInWithEmailAndPassword(auth, values.email, values.password).then(
      () => {
        navigate('/')
      }
    )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  async function signinwithgoogle() {
    await signInWithPopup(auth, provider)
      .then(() => {
        navigate('/')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode , errorMessage)
      });
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <Card className='flex w-96 p-8 gap-4'>
        <CardHeader>
          <h1 className='text-2xl text-violet-600 font-bold' >Login Here</h1>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <Input
            isRequired
            type="email"
            label="Email"
            defaultValue=""
            className="max-w-xs"
            {...register("email")}
          />
          <Input
            isRequired
            type="password"
            label="Password"
            defaultValue=""
            className="max-w-xs"
            {...register("password")}
          />
          <Button type='submit' color='secondary'>Login</Button>
          <Button color='primary' onClick={signinwithgoogle}>Sign In with Google</Button>
        </form>
        <CardFooter>
          <Link to='/signup' className="underline text-purple-600">New Here! Register Now</Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login