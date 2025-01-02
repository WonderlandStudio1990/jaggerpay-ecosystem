import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { MoniteService } from '@/lib/monite/service';
import { authLogger } from '@/lib/logger';

interface SignupData {
  email: string;
  password: string;
  type: 'organization' | 'individual';
  address: {
    country: string;
    city: string;
    postal_code: string;
    line1: string;
    line2?: string;
    state?: string;
  };
  organization?: {
    legal_name: string;
    tax_id?: string;
  };
  individual?: {
    first_name: string;
    last_name: string;
    tax_id?: string;
  };
}

export async function POST(request: Request) {
  try {
    const data: SignupData = await request.json();
    authLogger.info('Processing signup request', { email: data.email, type: data.type });

    // Create Supabase user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          type: data.type,
        },
      },
    });

    if (authError) {
      authLogger.error('Failed to create Supabase user', { error: authError });
      throw authError;
    }

    if (!authData.user || !authData.session) {
      throw new Error('Failed to create user');
    }

    authLogger.info('User created successfully', { userId: authData.user.id });

    // Create Monite entity
    const moniteService = new MoniteService();
    const entity = await moniteService.createEntity({
      name: data.email.split('@')[0],
      type: 'organization',
      status: 'active',
      metadata: {
        user_id: authData.user.id,
        email: data.email,
        created_at: new Date().toISOString(),
      },
      settings: {
        currency: 'USD',
        timezone: 'UTC',
      },
    });

    authLogger.info('Monite entity created', { entityId: entity.id });

    // Update user with entity ID
    const { error: updateError } = await supabase.auth.updateUser({
      data: { entity_id: entity.id }
    });

    if (updateError) {
      authLogger.error('Failed to update user with entity ID', { error: updateError });
      // Continue anyway as this is not critical
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
      entity,
    });
  } catch (error) {
    authLogger.error('Signup failed', { error });
    return NextResponse.json(
      { error: 'Failed to create user and entity' },
      { status: 500 }
    );
  }
} 