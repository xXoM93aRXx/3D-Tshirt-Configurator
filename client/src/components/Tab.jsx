import React from 'react'
import {useSnapshot} from 'valtio'
import state from '../store'
//Add the props that were added in the customizer page
const Tab = ({tab,isFilterTab,isActiveTab,handleClick}) => {
  const snap = useSnapshot(state)
  //The next piece of code checks if the the filter tab is an active tab and gives it styling accordingly
  const activeStyles = isFilterTab && isActiveTab ? {backgroundColor: snap.color, opacity:0.5} : {backgroundColor: "transparent", opacity:1}
  return (
    <div
    key ={tab.name}
    //That checks if is a filter tab then it will be a glassmorphic rouned tab else it will be just a rounded tab
    className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
    onClick={handleClick}
    >
    {/*This will contain the tab icon*/}
      <img src={tab.icon} alt='tab.name' className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}/>
    </div>
  )
}

export default Tab