"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import validator from "validator";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const { createAccount, login } = useAuthStore();

  type Errors = {
    operationError?: string;
    fullName?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState<Errors>({});

  async function handelSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { fullName, email, password, passwordConfirm } = Object.fromEntries(
      formData
    ) as Record<string, string>;

    // validation
    const error: Errors = {};

    if (!fullName) error.fullName = "Full name is required!";
    if (!email) error.email = "Email is required!";
    if (!password) error.password = "Password is required!";
    if (!passwordConfirm)
      error.passwordConfirm = "Password confirmation is required!";
    if (password && passwordConfirm && password !== passwordConfirm)
      error.passwordConfirm = "Passwords do not match!";
    if (password && !validator.isLength(password, { min: 8, max: 30 }))
      error.password = "Password must be 8 to 30 characters!";
    if (email && !validator.isEmail(email))
      error.email = "Invalid email address!";
    if (fullName && !validator.isLength(fullName, { min: 3, max: 30 }))
      error.fullName = "Full name must be 3 to 30 characters!";

    if (Object.keys(error).length > 0) {
      setIsError(error);
      return;
    }

    // call the store
    setIsPending(true);
    setIsError({});

    const registerResponse = await createAccount(
      fullName.toString(),
      email.toString(),
      password.toString()
    );

    if (registerResponse.error) {
      error.operationError = registerResponse.error.message;
      setIsError(error);
      setIsPending(false);
      return;
    } else {
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        error.operationError = loginResponse.error.message;
        setIsError(error);
        setIsPending(false);
        return;
      }
    }
    setIsPending(false);
  }
  return (
    <div className='flex justify-center items-center p-8 max-w-full h-screen'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>
            {isPending ? "Processing....." : "Create an Account"}
          </CardTitle>
          <CardDescription className='text-red-600'>
            {isError?.operationError ? isError.operationError : ""}
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
          <form onSubmit={handelSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='gap-2 grid'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  type='text'
                  name='fullName'
                  placeholder='Enter Your Full Name'
                  onFocus={() => setIsError({})}
                  required
                />
                <p className='text-red-600'>{isError?.fullName || ""}</p>
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  onFocus={() => setIsError({})}
                  placeholder='user@example.com'
                  required
                />
                <p className='text-red-600'>{isError?.email || ""}</p>
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  onFocus={() => setIsError({})}
                  placeholder='Enter Your Password'
                  required
                />
                <p className='text-red-600'>{isError?.password || ""}</p>
              </div>
              <div className='gap-2 grid'>
                <Label htmlFor='passwordConfirm'>Confirm Password</Label>
                <Input
                  id='passwordConfirm'
                  type='password'
                  name='passwordConfirm'
                  onFocus={() => setIsError({})}
                  placeholder='Confirm Your Password'
                  required
                />
                <p className='text-red-600'>{isError?.passwordConfirm || ""}</p>
              </div>
            </div>

            <CardFooter className='flex-col gap-2 mt-4 p-4'>
              <Button
                disabled={isPending}
                type='submit'
                className='w-full transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300 hover:cursor-pointer transform'
              >
                Signup
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
