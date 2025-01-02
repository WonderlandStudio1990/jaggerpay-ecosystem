import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  company?: string;
}

const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {mode === 'signup' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Your Company"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register('company', { required: 'Company is required' })}
                />
                {errors.company && (
                  <p className="text-sm text-destructive">{errors.company.message}</p>
                )}
              </div>
            </>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              disabled={isLoading}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background" />
            )}
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;