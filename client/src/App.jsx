import Home from './pages/Home'
import Customizer from './pages/Customizer'
import CanvasModel from './canvas'

import React from 'react'

const App = () => {
  return (
    <main className='app transition-all ease-in'>
      <Home/>
      <Customizer/>
      <CanvasModel/>
    </main>
  )
}

export default App
