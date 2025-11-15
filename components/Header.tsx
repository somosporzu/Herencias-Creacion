import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-400 tracking-tight">
        Creador de Herencias
      </h1>
      <p className="mt-2 text-lg text-gray-400 max-w-2xl mx-auto">
        Diseña razas y linajes para <span className="font-bold text-amber-300">Sistema Papa2</span>. 
        Equilibra ventajas y desventajas para forjar creaciones únicas.
      </p>
    </header>
  );
};

export default Header;
