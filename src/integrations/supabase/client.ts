// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dhedjbqpkdqbcavbzeoo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZWRqYnFwa2RxYmNhdmJ6ZW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MTY5NzUsImV4cCI6MjA1NzA5Mjk3NX0.AIpbj0S87Fd9WARyreNTBB_CyFuwHXb71HnTir1i1VY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);