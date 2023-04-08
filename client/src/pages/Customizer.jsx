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
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type)=>{
    if(!prompt) return alert ("Please enter a prompt")
    try {
      //Call our backend to generate an image
    } catch (error) {
      alert(error)
    }finally{
      setGeneratingImg(false);
      setActiveEditorTab("")
    }
  }


//This function reads the file it fires the handle decals function 
const readFile = (type)=>{
  reader(file).then((result)=>{
    handleDecals(type,result);
    setActiveEditorTab("")
  })
}

//The handle decals function decides if it a full texture or a logo
const handleDecals = (type,result) =>{
  const decalType = DecalTypes[type];
  state[decalType.stateProperty]=result;
  //This checks if this decal is currently active
  if(!activeFilterTab[decalType.filterTab]) {
    handleActiveFilterTab(decalType.filterTab)
  }
}

//This function helps to know if the logo is on or not and if the texture is on or not or even both
const handleActiveFilterTab = (tabName)=>{
  switch (tabName) {
    case "logoShirt":
      //This toggles it on or off
      state.isLogoTexture = !activeFilterTab[tabName]
      break;
    case "stylishShirt":
      //This toggles it on or off
      state.isFullTexture = !activeFilterTab[tabName]
      break;
  
    default:
      state.isFullTexture = false;
      state.isLogoTexture = true;
  }


  //This updates the activeFilterTabs after setting the state

  setActiveFilterTab((prevState)=>{
    return{
      ...prevState,
      [tabName]:!prevState[tabName]
    }
  })
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
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={()=>handleActiveFilterTab(tab.name)}/>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer