import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://izjimlelufzscyfaespk.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6amltbGVsdWZ6c2N5ZmFlc3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTk1NTAsImV4cCI6MjA1OTc5NTU1MH0.iA4-wK10S_5-8iUWBZk4ajwjIEGiICOSDadWtPV375c'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
