import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
  resolve: name => {
    console.log(`Loading page: ./Pages/${name}.jsx`);
    return import(`./Pages/${name}.jsx`).then(module => {
      if (!module.default) {
        throw new Error(`Page ${name} does not have a default export`);
      }
      return module.default;
    }).catch(err => {
      console.error(`Failed to load page ${name}:`, err);
      throw err;
    });
  },
  setup({ el, App, props }) {
    try {
      createRoot(el).render(<App {...props} />);
    } catch (err) {
      console.error('Failed to render App:', err);
      throw err;
    }
  },
});