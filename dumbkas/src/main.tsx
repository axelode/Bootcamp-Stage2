import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import Dasboard from './pages/Dashboard.tsx'

import "./assets/style/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   {/* <Home /> */}
  //   <Dasboard />
  // </React.StrictMode>,

  <>
    <Dasboard />
    {/* <Home /> */}
  </>
)
