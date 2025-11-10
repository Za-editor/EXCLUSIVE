import { supabase } from "../lib/supabase-client";

// Email Sign up
export const signUpWithEmail = async (email, password,first_name= "", last_name = "" ) => {
  const name = `${first_name} ${last_name}`.trim();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name, last_name, name },
    },
  });

  if (error) throw error;

  const user = data.user;
  if (user) {
    await supabase.from("profiles").insert([
      {
        id: user.id,
        name,
        email: user.email,
      },
    ]);
  }

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
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
  } else {
    console.log("User signed out successfully");
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  supabase.auth.onAuthStateChange((event, session) => callback(event, session));
};
