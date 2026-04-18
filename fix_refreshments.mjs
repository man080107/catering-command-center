import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function debugDb() {
  const { data, error } = await supabase
    .from('menu_packages')
    .select('id, name, tab');
    
  if (error) {
    console.error("Select Error:", error);
  } else {
    console.log("All packages:", JSON.stringify(data, null, 2));
  }
}

debugDb();
