
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { CarrinhoProvider } from './context/CarrinhoProvider.jsx';

import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <CarrinhoProvider>
                <App />
            </CarrinhoProvider>
        </BrowserRouter>
    </StrictMode>
)
