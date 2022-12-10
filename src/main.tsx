import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { FlowContextProvider } from './contexts/flowContext';
import { ToastContextProvider } from './contexts/toastContext';
import DummyErrorBoundary from './DummyErrorBoundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DummyErrorBoundary>
      <ToastContextProvider>
        <FlowContextProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </FlowContextProvider>
      </ToastContextProvider>
    </DummyErrorBoundary>
  </React.StrictMode>,
);
