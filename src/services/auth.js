import { supabase } from "../lib/supabase-client";

export const signUpWithEmail = async (email, password) => {
    supabase.auth.signUp({ email, password });
}

export const signInWithEmail = async (email, password) => { 
    supabase.auth.signIn({ email, password });
}
export const signInWithGoogle = async () => { 
    supabase.auth.signInWithOAuth({provider: "google"})
}
export const signOut = async () => {
    supabase.auth.signOut();
}

export const onAuthStateChange = (callback) => { 
    supabase.auth.onAuthStateChange((event, session) => callback(event, session));
}