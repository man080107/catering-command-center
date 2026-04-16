import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: 'kasetiyaman08@gmail.com',
    password: 'Man2007@.',
  });
  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('Successfully signed up user!', data.user?.email);
  }
}

signUp();
