import React,{useRef} from 'react'
import {easing} from 'maath'
import {useFrame} from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
  //We will need the reference to shadows later on
  const shadows = useRef()
  return (

    // The position needs to be set so as not to hide the shirt model
    <AccumulativeShadows
    ref={shadows}
    //Smoothes our the shadows over time
    temporal
    //The renderer is going to render 60 frames
    frames={60}
    //For the transparency of the shadows
    alphaTest={0.85}
    rotation={[Math.PI/2,0,0]}
    position={[0,0,-0.14]}>
      {/* The randomized light is a light source in a 3D scene */}
      <RandomizedLight 
      //To spread the lights
      radius={9}
      intensity={0.55}
      ambient={0.25}
      position={[5,5,-10]}
      amount={4}
      />
       {/* To add another light source */}
      <RandomizedLight 
      //To spread the lights
      radius={5}
      intensity={0.25}
      ambient={0.25}
      position={[-5,5,-9]}
      amount={4}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop