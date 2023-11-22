import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

export async function GET(req) {
  const {
    data: { users },
    error,
  } = await adminAuthClient.listUsers();
  return NextResponse.json(users);
}

export async function POST(req) {
  console.log(req);
  
  return NextResponse.json({});
}