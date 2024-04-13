import React from 'react'
import ReactDOM from 'react-dom/client'

import APP from './app/APP'

import { BrowserRouter } from 'react-router-dom'

import "./assets/style/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <APP />
    </BrowserRouter>
  </React.StrictMode>,
)
