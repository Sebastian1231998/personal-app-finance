import { useEffect, useState } from 'react'
import { supabase } from '../../configuration/supabase'
import { Outlet } from 'react-router';
import type { Session } from '@supabase/supabase-js';
import Unauthenticated from '../componentes/Unauthenticated';


export async function clientLoader() {
  const { data: { session } } = await supabase.auth.getSession();
  console.log("INFO: GET Supabase Session:", session);
  return { session };
}

export default function ProtectedRoute({ loaderData }: { loaderData: Awaited<ReturnType<typeof clientLoader>> }) {
  const [session, setSession] = useState<Session | null>(loaderData.session);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if(!session){
    return <Unauthenticated />
  }
  
  return <Outlet />;
}