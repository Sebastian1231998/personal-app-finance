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
      className="
        flex justify-start px-4 py-2 rounded
        bg-[#5B2E8A]       /* morado oscuro */
        hover:bg-[#7A39B7] /* morado un poco más claro */
        text-white
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
      "
    >
      Cerrar sesión
    </button>

    {errorSignOut && <ErrorMessage message='No se pudo cerrar sesión' />}
    </>
    
  )
}

export default ButtonSignOut
