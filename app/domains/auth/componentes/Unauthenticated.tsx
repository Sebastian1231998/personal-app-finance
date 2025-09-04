import { useNavigate } from 'react-router';

function Unathorized() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Acceso restringido
        </h2>
        <p className="text-gray-600 mb-6">
          No tienes acceso a esta ruta. Inicia sesión para continuar.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="btn-primary">

          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Unathorized;