'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Cliente de Supabase personalizado
import { useRouter } from 'next/navigation';

const supabase = createClient();

interface Problem {
  id: number;
  tipo_operacion: string;
  valor1: number;
  valor2: number;
  respuesta: number;
  dificultad: number;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MathQuiz: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('problemas')
        .select('*')
        .eq('tipo_operacion', 'multiplicacion')
        .limit(5);
      
      if (error) {
        console.error('Error fetching problems:', error);
      } else if (data) {
        setProblems(shuffleArray(data));
      }
      setLoading(false);
    };

    fetchProblems();
  }, []);

  const handleAnswer = (answer: number) => {
    const currentProblem = problems[currentProblemIndex];
    if (answer === currentProblem.respuesta) {
      alert('¡Correcto!');
    } else {
      alert(`Incorrecto, la respuesta correcta es ${currentProblem.respuesta}`);
    }

    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      alert('¡Has completado todos los problemas!');
      setCurrentProblemIndex(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Cargando problemas...
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        No se encontraron problemas de multiplicación.
      </div>
    );
  }

  const currentProblem = problems[currentProblemIndex];
  const options = shuffleArray([
    currentProblem.respuesta,
    currentProblem.respuesta + 1,
    currentProblem.respuesta - 1,
    currentProblem.respuesta + 2,
  ]);

  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Problemas de Multiplicación</h1>
      <p className="text-lg text-gray-300 mb-6">
        Responde las siguientes multiplicaciones correctamente.
      </p>
      <div className="mb-6 text-center">
        <p className="text-2xl">
          ¿Cuánto es {currentProblem.valor1} × {currentProblem.valor2}?
        </p>
        <div className="mt-4 space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors w-full"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => router.push('/protected')}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg transition-colors"
      >
        Ir a la Página Protegida
      </button>
    </div>
  );
};

export default MathQuiz;
