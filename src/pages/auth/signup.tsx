import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // TODO: Implement signup logic with Supabase
      await router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>
        <Card className="p-6">
          <AuthForm mode="signup" onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/auth/login" className="hover:text-brand underline underline-offset-4">
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage; 