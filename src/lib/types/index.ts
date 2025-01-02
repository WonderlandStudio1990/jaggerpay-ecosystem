import { AuthError } from '@supabase/supabase-js';

export interface MoniteAmount {
  value: number;
  currency: string;
}

export interface MoniteEntity {
  id: string;
  type: 'individual' | 'organization';
  email: string;
  status: 'active' | 'inactive';
  address: {
    country: string;
    city: string;
    postal_code: string;
    line1: string;
    line2?: string;
    state?: string;
  };
  organization?: {
    name: string;
    is_test?: boolean;
  };
  individual?: {
    first_name: string;
    last_name: string;
    tax_id?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface MoniteEntityCreate {
  type: 'individual' | 'organization';
  email: string;
  address: {
    country: string;
    city: string;
    postal_code: string;
    line1: string;
    line2?: string;
    state?: string;
  };
  organization?: {
    name: string;
    is_test?: boolean;
  };
  individual?: {
    first_name: string;
    last_name: string;
    tax_id?: string;
  };
}

export interface MoniteCounterpart {
  id: string;
  type: 'individual' | 'organization';
  name?: string;
  email?: string;
  phone?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface MoniteReceivable {
  id: string;
  amount: MoniteAmount;
  currency: string;
  due_date: string;
  status: 'draft' | 'issued' | 'paid' | 'canceled' | 'overdue';
  counterpart_id: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface MonitePayable {
  id: string;
  amount: MoniteAmount;
  currency: string;
  due_date: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  counterpart_id: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface QueryParams {
  limit?: number;
  offset?: number;
  sort?: string;
  filter?: Record<string, any>;
}

export interface MoniteError extends Error {
  code: string;
  status: number;
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function isMoniteError(error: unknown): error is { message: string; code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error &&
    typeof (error as any).message === 'string' &&
    typeof (error as any).code === 'string'
  );
} 