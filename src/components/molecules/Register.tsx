import { Button } from '@nextui-org/button'
import { Card, CardHeader } from '@nextui-org/card'
import { Input } from '@nextui-org/input'

const Register = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
      <Card className='flex w-96 p-8 gap-4'>
        <CardHeader>
          <h1 className='text-2xl text-violet-600 font-bold' >Register Here</h1>
        </CardHeader>
        <Input
          isRequired
          type="email"
          label="Email"
          defaultValue="junior@nextui.org"
          className="max-w-xs"
        />
        <Input
          isRequired
          type="password"
          label="Password"
          defaultValue=""
          className="max-w-xs"
        />
        <Input
          isRequired
          type="password"
          label="Confirm Password"
          defaultValue=""
          className="max-w-xs"
        />
        <Button color='secondary'>Register</Button>
      </Card>
    </div>
  )
}

export default Register