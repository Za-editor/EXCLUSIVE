import { supabase } from "../lib/supabase-client";

// Email Sign up
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

// Email Sign in
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// Google Sign in
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });
    if (error) throw error;
};


// Sign Out
export const signOut = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) throw error;
};


// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  supabase.auth.onAuthStateChange((event, session) => callback(event, session));
};
