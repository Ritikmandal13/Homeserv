import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'service_provider' | 'admin';
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, phone: string, role: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return false;
      }

      if (!data) {
        console.error('Profile not found');
        return false;
      }

      setProfile(data);
      return true;
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      return false;
    }
  };

  const handleAuthStateChange = async (event: string, session: Session | null) => {
    if (!initialized) {
      setInitialized(true);
    }

    if (session?.user) {
      setUser(session.user);
      setSession(session);
      const profileExists = await fetchProfile(session.user.id);
      
      if (!profileExists) {
        console.log('Profile not found, signing out');
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setProfile(null);
      }
    } else {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session first
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        handleAuthStateChange('INITIAL_SESSION', session);
      }
    });

    // Then set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted && initialized) {
        handleAuthStateChange(event, session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [initialized]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string, role: string) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            phone: phone,
            role: role,
          }
        }
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
