import React from 'react';
import { Head } from '@inertiajs/inertia-react';

export default function AppLayout({ children, title }) {
  return (
    <div>
      <Head title={title} />
      <header>
        <nav>
          <a href="/productos/nuevo">Nuevo cargo</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
