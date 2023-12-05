import React from 'react'
import { Authh } from './Auth/Authh'
import {motion} from "framer-motion"
import {Schedule} from '../components/scheduler/schedule'
import "../styles/dash.css"

export const Dash = (props)=> {

  return (
   <div >
    <h1 className='welcome'> Wellcome Back {props.name}</h1>

  < div className='schedule'>
    <Schedule/>
  </div>
   </div>
   
   
   

  );
}

