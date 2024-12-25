import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js'
import { MoniteSDK } from 'npm:@monite/sdk-api'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting create-monite-entity function');
    
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header provided');
      throw new Error('No authorization header provided')
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { data: { user }, error: getUserError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (getUserError || !user) {
      console.error('Failed to get user:', getUserError);
      throw new Error('Unauthorized')
    }

    console.log('Got authenticated user:', user.id);

    const { data: entity, error: getEntityError } = await supabaseAdmin
      .from('entities')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (getEntityError) {
      console.error('Failed to get entity:', getEntityError);
      throw new Error('Failed to get entity')
    }

    if (!entity) {
      console.error('Entity not found');
      throw new Error('Entity not found')
    }

    console.log('Found entity:', entity);

    const moniteApiUrl = Deno.env.get('MONITE_API_URL');
    const moniteClientId = Deno.env.get('MONITE_CLIENT_ID');
    const moniteClientSecret = Deno.env.get('MONITE_CLIENT_SECRET');

    if (!moniteApiUrl || !moniteClientId || !moniteClientSecret) {
      console.error('Missing Monite configuration');
      throw new Error('Missing required Monite configuration');
    }

    // First get a token
    console.log('Fetching initial Monite token');
    const tokenResponse = await fetch(`${moniteApiUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-monite-version': '2024-01-31',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: moniteClientId,
        client_secret: moniteClientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Failed to fetch initial Monite token:', errorText);
      throw new Error('Failed to fetch initial Monite token')
    }

    const tokenData = await tokenResponse.json();

    // Initialize SDK with the token we just got
    const sdk = new MoniteSDK({
      apiUrl: moniteApiUrl,
      entityId: '', // Empty for entity creation
      token: tokenData.access_token,
    });

    console.log('Creating Monite entity');

    try {
      const response = await sdk.entities.create({
        type: 'organization',
        organization: {
          legal_name: entity.name,
          is_supplier: true,
          tax_id: '123456789',
        },
      })

      console.log('Monite entity created:', response);

      const { error: updateError } = await supabaseAdmin
        .from('entities')
        .update({ monite_entity_id: response.id })
        .eq('user_id', user.id)

      if (updateError) {
        console.error('Failed to update entity:', updateError);
        throw new Error('Failed to update entity')
      }

      return new Response(
        JSON.stringify({ success: true, entity_id: response.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (error) {
      console.error('Error creating Monite entity:', error);
      throw error;
    }

  } catch (error) {
    console.error('Error in create-monite-entity function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})