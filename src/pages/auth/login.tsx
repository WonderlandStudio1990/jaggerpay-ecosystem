import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement login logic with Supabase
      await router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <Card className="p-6">
          <AuthForm mode="login" onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/signup" className="hover:text-brand underline underline-offset-4">
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 