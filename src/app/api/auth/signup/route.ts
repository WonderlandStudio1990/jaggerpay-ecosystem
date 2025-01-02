import { NextResponse } from 'next/server';
import { MoniteService } from '@/lib/monite/service';
import { EntityCreate, EntityCreateTypeEnum } from '@/lib/monite/api/generated/api';
import { signUp } from '@/lib/supabase/client';
import { moniteLogger } from '@/lib/logger';
import { authLogger } from '@/lib/logger';

interface SignupData {
  type: 'organization' | 'individual';
  email: string;
  password: string;
  name: string;
  address: {
    country: string;
    city: string;
    postal_code: string;
    line1: string;
    line2?: string;
    state?: string;
  };
  tax_id?: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as SignupData;
    authLogger.debug('Processing signup request', { email: data.email, type: data.type });

    // First, create the Monite entity
    const moniteService = new MoniteService(
      process.env.NEXT_PUBLIC_MONITE_API_URL!,
      process.env.NEXT_PUBLIC_MONITE_CLIENT_ID!,
      process.env.NEXT_PUBLIC_MONITE_CLIENT_SECRET!
    );

    const entityData: EntityCreate = {
      type: data.type === 'organization' ? EntityCreateTypeEnum.Organization : EntityCreateTypeEnum.Individual,
      email: data.email,
      address: data.address,
      ...(data.type === 'organization' ? {
        organization: {
          legal_name: data.name,
          tax_id: data.tax_id
        }
      } : {
        individual: {
          first_name: data.name.split(' ')[0],
          last_name: data.name.split(' ').slice(1).join(' ') || undefined
        }
      })
    };

    moniteLogger.debug('Creating Monite entity', { email: data.email });
    const entity = await moniteService.createEntity(entityData);
    moniteLogger.info('Monite entity created successfully', { entityId: entity.id });

    // Then, create the Supabase user with the Monite entity ID
    const metadata = {
      monite_entity_id: entity.id,
      entity_type: data.type,
      name: data.name
    };

    authLogger.debug('Creating Supabase user', { email: data.email });
    const { user, session } = await signUp(
      data.email,
      data.password,
      metadata
    );
    authLogger.info('Supabase user created successfully', { userId: user?.id });

    return NextResponse.json({
      user,
      session,
      entity
    }, { status: 201 });
  } catch (error) {
    authLogger.error('Signup failed', { error });

    // If it's a known error type, return a more specific error message
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 