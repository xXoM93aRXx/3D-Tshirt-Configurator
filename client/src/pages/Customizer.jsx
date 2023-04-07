import React,{useState,useEffect} from 'react'
import {AnimatePresence,motion} from 'framer-motion'
import {useSnapshot} from 'valtio'

import config from '../config/config'
import state from '../store'
import {download} from '../assets'
import {downloadCanvasToImage,reader} from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import {fadeAnimation,slideAnimation} from '../config/motion'
import { CustomButton, AIPicker, ColorPicker, FilePicker, Tab } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')   //This is a state for the file
  const [prompt, setPrompt] = useState('')  //Ai prompt state
  const [generatingImg, setGeneratingImg] = useState(false) //This will control the loading state of the image
  const [activeEditorTab, setActiveEditorTab] = useState("") //This checks the active editor tab
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  }) //This checks the active filter tab


  //Show the tab content depending on the active tab. 
  //===============================================//
  //How this works is that it will be a switch statement that always looks for the active editor tab and returns the component that is relevant to the case
  const generateTabContent = ()=>{
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker/>
      case "aipicker":
        return <AIPicker/>
      default:
        return null;
    }
  }
  return (
    <AnimatePresence>
      {!snap.intro &&(
        <>
          <motion.div
          key="custom"
          className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {/*The handle click over here sets the active tab to the tab name so that generate tab content function works accordingly */}
                {EditorTabs.map((tab)=>(<Tab key={tab.name} tab={tab} handleClick={()=>setActiveEditorTab(tab.name)}/>))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton type="filled" title="Go Back" handleClick={()=> state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm"/>
          </motion.div>

          <motion.div className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab)=>(
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab="" handleClick={()=>{}}/>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer