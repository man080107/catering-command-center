import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function updateDb() {
  const { data, error } = await supabase
    .from('menu_packages')
    .update({ min_pax: '10' })
    .eq('tab', 'connect');
    
  if (error) {
    console.error("Update Error:", error);
  } else {
    console.log("Updated Small Group Takeaway successfully.");
  }
}

updateDb();
