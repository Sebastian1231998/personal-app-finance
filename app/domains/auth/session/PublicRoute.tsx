
import { supabase } from '../../configuration/supabase'
import { Outlet, redirect } from 'react-router';

export async function clientLoader() {
  const { data: { session } } = await supabase.auth.getSession();
  console.log("INFO: GET Supabase Session:", session);
  if(session){
    return redirect('/dashboard');
  }
  return null;
}

export default function PublicRoute() {
  return <Outlet />;
}