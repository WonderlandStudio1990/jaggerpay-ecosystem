import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { moniteService } from '@/lib/services';
import { useToast } from '@/components/ui/use-toast';
import { MoniteEntity } from '@/lib/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  entity: MoniteEntity | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [entity, setEntity] = useState<MoniteEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (event === 'SIGNED_IN') {
        try {
          // Fetch or create Monite entity
          const entityId = await getOrCreateEntity(session!.user.id);
          const entityData = await moniteService.getEntity(entityId);
          setEntity(entityData);
        } catch (error) {
          console.error('Error fetching entity:', error);
          toast({
            title: 'Error',
            description: 'Failed to fetch entity data. Please try again.',
            variant: 'destructive',
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setEntity(null);
        router.push('/auth/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getOrCreateEntity = async (userId: string) => {
    // Check if user already has an entity
    const { data: entityData, error: fetchError } = await supabase
      .from('monite_entities')
      .select('entity_id')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (entityData?.entity_id) {
      return entityData.entity_id;
    }

    // Create new entity if none exists
    const newEntity = await moniteService.createEntity({
      type: 'organization',
      status: 'active',
      organization: {
        name: `Organization ${userId.slice(0, 8)}`,
        is_test: true,
      },
    });

    // Store entity reference in Supabase
    const { error: insertError } = await supabase
      .from('monite_entities')
      .insert({
        user_id: userId,
        entity_id: newEntity.id,
      });

    if (insertError) {
      throw insertError;
    }

    return newEntity.id;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw error;
    }
  };

  const value = {
    session,
    user,
    entity,
    isLoading,
    isAuthenticated: !!session?.user,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}