// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase-client";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error(error);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    getSession();

   
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading };
};

// Ensure profile exists for new users (Google or email)
export const ensureProfileExists = async (user) => {
  if (!user) return;

  // Check if profile already exists
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (existing) return; 

  // Get name from user metadata
  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.user_metadata?.display_name ||
    "Unnamed User";

  const { error } = await supabase.from("profiles").insert([
    {
      id: user.id,
      name,
      email: user.email,
    },
  ]);

  if (error) console.error("Error creating profile:", error.message);
  else console.log("✅ Created profile for user:", name);
};
