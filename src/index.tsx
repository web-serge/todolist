import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<App />);

serviceWorker.unregister();

