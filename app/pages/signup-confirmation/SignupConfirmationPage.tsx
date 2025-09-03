import React from 'react'
import { NavLink } from 'react-router';


const SignupConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-neutral)] font-sans">
      <div className="card w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--color-dark)] mb-4">
          ¡Registro exitoso!
        </h1>
        <p className="text-gray-700 mb-6">
          Se ha enviado un correo de confirmación a la dirección que registraste. 
          Por favor revisa tu bandeja de entrada para completar el registro.
        </p>
        <NavLink
          to="/login"
          className="btn-primary"
        >
          Ir a iniciar sesión
        </NavLink>
      </div>
    </div>
  );
};

export default SignupConfirmationPage;