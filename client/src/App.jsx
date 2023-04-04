import Home from './pages/Home'
import Customizer from './pages/Customizer'
import Canvas from './canvas'

import React from 'react'

const App = () => {
  return (
    <main className='app transition-all ease-in'>
      <Home/>
      <Customizer/>
      <Canvas/>

    </main>
  )
}

export default App
