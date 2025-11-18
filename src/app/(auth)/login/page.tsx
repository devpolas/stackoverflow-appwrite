"use client";
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
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuthStore();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState("");

  async function handelLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
      setIsError("Please Provide Email and Password!");
      return;
    }

    setIsPending(true);
    setIsError("");

    const loginResponse = await login(email.toString(), password.toString());

    if (loginResponse.error) {
      setIsError("Invalid Credential!");
      setIsPending(false);
      return;
    }
    setIsPending(false);
  }
  return (
    <div className='flex justify-center items-center p-8 max-w-full h-screen'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>
            {isPending ? "Processing....." : "Login to your account"}
          </CardTitle>
          <CardDescription className='text-red-600'>
            {isError ? isError : ""}
          </CardDescription>
          <CardAction>
            <Link
              className='hover:bg-green-700 p-1.5 rounded-sm outline text-green-700 hover:text-white'
              href={"/register"}
            >
              Signup
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelLogin}>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  onFocus={() => setIsError("")}
                  placeholder='user@example.com'
                  required
                />
              </div>
              <div className='gap-2 grid'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='inline-block ml-auto text-sm hover:underline underline-offset-4'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  onFocus={() => setIsError("")}
                  name='password'
                  placeholder='Enter Your Password'
                  required
                />
              </div>
            </div>
            <CardFooter className='flex-col gap-2 mt-4 p-4'>
              <Button
                disabled={isPending}
                type='submit'
                className='w-full transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300 hover:cursor-pointer transform'
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
