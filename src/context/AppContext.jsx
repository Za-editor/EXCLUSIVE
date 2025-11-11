import {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase-client";
import { useAuth } from "../hooks/useAuth";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) return setProfile(null);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    let profileData = data || {};

    // Fallback for Google / OAuth users
    if (
      (!profileData.first_name || !profileData.last_name) &&
      user?.user_metadata?.name
    ) {
      const [first, ...rest] = user.user_metadata.name.split(" ");
      profileData.first_name = first;
      profileData.last_name = rest.join(" ") || "";
    }

    if (error) {
      console.error("Error fetching profile:", error.message);
      setProfile(profileData); // still set whatever we have
    } else {
      setProfile(profileData);
    }
  }, [user]);

  const fetchAll = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    await Promise.all([fetchProfile()]);
    setLoading(false);
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!authLoading) fetchAll();
  }, [authLoading, fetchAll]);

  // Compute a friendly display name for convenience
  const displayName =
    profile?.first_name ||
    profile?.name ||
    user?.user_metadata?.name ||
    "Guest";

  return (
    <AppContext.Provider
      value={{
        profile,
        displayName, 
        refreshProfile: fetchProfile,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


