'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestra Plataforma</h1>
      <p className="text-lg text-gray-300 mb-6">Gestiona tus datos de manera eficiente y sencilla.</p>
      <button
        onClick={() => router.push('/protected/sumar')}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors"
      >
        Ir a Sumas
      </button>
      <button
        onClick={() => router.push('/protected/restas')}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors"
      >
        Ir a Restas
      </button>
      <button
        onClick={() => router.push('/protected/multi')}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors"
      >
        Ir a Multiplicaciones
      </button>
    </div>
  );
};

export default LandingPage;