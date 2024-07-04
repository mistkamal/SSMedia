import { Button } from '@nextui-org/button'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { auth } from '../../lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

interface RegisterFormInsterface {
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<RegisterFormInsterface>()

  async function onSubmit(values: RegisterFormInsterface) {
    if (values.password === values.confirmPassword) {
      await createUserWithEmailAndPassword(auth, values.email, values.password).then(
        () => {
          navigate('/login')
        }
      ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    }
    else {
      alert('Password Not Matched!')
    }
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <Card className='flex w-96 p-8 gap-4'>
        <CardHeader>
          <h1 className='text-2xl text-violet-600 font-bold' >Register Here</h1>
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
          <Input
            isRequired
            type="password"
            label="confirmPassword"
            defaultValue=""
            className="max-w-xs"
            {...register("confirmPassword")}
          />
          <Button type='submit' color='secondary'>Register</Button>
        </form>
        <CardFooter>
          <Link to='/login' className="underline text-purple-600">Already Registerd? Login Here</Link>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Register