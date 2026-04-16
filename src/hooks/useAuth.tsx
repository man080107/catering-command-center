import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const CACHE_KEY = "2ic_admin_cache";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Read cached state synchronously from sessionStorage
const readCache = (): { userId: string; isAdmin: boolean } | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeCache = (userId: string, isAdmin: boolean) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ userId, isAdmin }));
  } catch {}
};

const clearCache = () => {
  try { sessionStorage.removeItem(CACHE_KEY); } catch {}
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cached = readCache();

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(cached?.isAdmin ?? false);
  // If we have a cache hit, start with loading=false for instant render
  const [loading, setLoading] = useState(!cached);

  const checkAdmin = async (userId: string): Promise<boolean> => {
    // Use cached value if the same user — skip the extra RPC
    const cache = readCache();
    if (cache && cache.userId === userId) return cache.isAdmin;

    const { data } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    const result = !!data;
    writeCache(userId, result);
    return result;
  };

  useEffect(() => {
    let resolved = false;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (resolved) return;
      resolved = true;
      setUser(session?.user ?? null);
      if (session?.user) {
        const admin = await checkAdmin(session.user.id);
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
        clearCache();
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const admin = await checkAdmin(session.user.id);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false);
          clearCache();
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    clearCache();
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
