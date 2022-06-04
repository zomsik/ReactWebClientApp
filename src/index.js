import React from 'react'

import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
/*
ReactDOM.render(
 <React.StrictMode>
 <BrowserRouter>
 <App />
 </BrowserRouter>
 </React.StrictMode>,
 document.getElementById('root')
)
*/

const container = document.getElementById('root')
const root = createRoot(container);
root.render(

  <BrowserRouter>
  <App />
  </BrowserRouter>


  );
