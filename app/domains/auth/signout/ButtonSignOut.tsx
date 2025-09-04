import { useState } from 'react'
import { useNavigate } from 'react-router';
import { supabase } from '~/domains/configuration/supabase'
import ErrorMessage from '~/shared/errors/ErrorMessage';

const ButtonSignOut = () => {

  const [errorSignOut, setErrorSignOut] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signOut = async()=>{
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if(error){
       setErrorSignOut(true)
       setLoading(false)
       return
    }
    setLoading(false)
    navigate("/login")
  }

  return (
    <>

      <button
        disabled={loading}
        onClick={() => signOut()}
        className="flex justify-start px-4 py-2 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white"
      >
        Cerrar sesión
      </button>

    {errorSignOut && <ErrorMessage message='No se pudo cerrar sesión' />}
    </>
    
  )
}

export default ButtonSignOut
