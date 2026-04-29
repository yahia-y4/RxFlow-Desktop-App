// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import { ErrorProvider } from './generalContext/ErrorContext/ErrorProvider.tsx';

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
        <ErrorProvider>
          <App />
         </ErrorProvider>
    </BrowserRouter>

)
