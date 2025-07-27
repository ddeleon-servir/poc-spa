import React from 'react';
import { Head } from '@inertiajs/inertia-react';

export default function Inicio() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <Head title="Inicio" />
      <h1 className="text-4xl font-bold mb-4">Bienvenido a Inertia + React + Symfony</h1>
      <p className="text-lg">Esta es la página de inicio renderizada con Inertia.js y React.</p>
    </div>
  );
}
