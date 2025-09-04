

import { NavLink } from "react-router";
import type { Route } from "../../routes/+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">

      {/* Header */}
      <header className="bg-primary text-white p-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">FinanzasApp</h1>
        <div>
          <NavLink to={"/login"} className="bg-white text-primary px-4 py-2 rounded-lg mr-2 font-semibold hover:bg-gray-100 transition">Iniciar sesión</NavLink>
          <NavLink to={"/signup"}  className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-light transition">Registrarse</NavLink>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="bg-secondary text-white py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Gestiona tu dinero, controla tus ahorros y gastos</h2>
          <p className="mb-6">Visualiza tus finanzas de manera simple y en tiempo real</p>
        
        </section>

        {/* Características / Beneficios */}
        <section className="py-16 px-6 bg-neutral text-dark grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center max-w-sm mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h13v6M9 17H4v-6h5m0 0v-6h13v6H9z" />
            </svg>
            <h3 className="font-bold text-xl mb-1">Control de gastos</h3>
            <p className="text-sm">Organiza y analiza todos tus gastos fácilmente</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center max-w-sm mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2 0-4 1-4 4s2 4 4 4 4-1 4-4-2-4-4-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v12" />
            </svg>
            <h3 className="font-bold text-xl mb-1">Ahorra para tus metas</h3>
            <p className="text-sm">Crea bolsillos de ahorro y alcanza tus objetivos</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col items-center max-w-sm mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11h2v2h-2zM12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            <h3 className="font-bold text-xl mb-1">Visualiza tu balance</h3>
            <p className="text-sm">Mira tu balance total en tiempo real</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-dark text-white p-6 text-center">
        <p>Contacto | Redes | Términos y condiciones</p>
      </footer>

    </div>
  )
}
