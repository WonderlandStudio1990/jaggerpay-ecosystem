import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthForm from '@/components/auth/AuthForm';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (data: any) => {
    try {
      setIsLoading(true);
      // TODO: Implement login logic with Supabase
      console.log('Login data:', data);
      
      toast({
        title: 'Success',
        description: 'Successfully logged in!',
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to log in. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-indigo-600" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent text-2xl font-bold">
            WonderPay
          </span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Streamline your business payments and get paid faster with WonderPay.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </div>
          <AuthForm mode="login" onSubmit={handleLogin} isLoading={isLoading} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 