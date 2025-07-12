import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from "framer-motion"
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { Toaster } from "sonner";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <Provider store={store}>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </Provider>
    </LazyMotion>

  </StrictMode>,
)
