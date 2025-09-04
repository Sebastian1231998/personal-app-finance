import React from 'react'

const LoadingUI = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-neutral)] z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        
        {/* Texto */}
        <p className="text-[var(--color-dark)] font-medium text-lg">
          Cargando...
        </p>
      </div>
    </div>
  );
};

export default LoadingUI;