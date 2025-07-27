import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <h1>React sin Inertia</h1>;
createRoot(document.getElementById('root')).render(<App />);
