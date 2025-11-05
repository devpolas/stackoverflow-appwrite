import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className='flex justify-center items-center p-8 max-w-full h-screen'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Enter your email and password below to signup an account
          </CardDescription>
          <CardAction>
            <Link
              className='hover:bg-green-700 p-1.5 rounded-sm outline text-green-700 hover:text-white'
              href={"/login"}
            >
              Login
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  type='text'
                  placeholder='Enter Your Full Name'
                  required
                />
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='user@example.com'
                  required
                />
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter Your Password'
                  required
                />
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='password'>Confirm Password</Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Confirm Your Password'
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Button type='submit' className='w-full hover:cursor-pointer'>
            Signup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
