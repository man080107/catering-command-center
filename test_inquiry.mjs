import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testInsert() {
  const { data, error } = await supabase.from('inquiries').insert({
    name: "Test Name",
    phone: "12345678"
  });
  
  if (error) {
    console.error("Insert Error:", error);
  } else {
    console.log("Insert Success!");
  }
}

testInsert();
