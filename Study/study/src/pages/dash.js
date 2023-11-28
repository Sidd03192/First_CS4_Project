import React from 'react'

import {motion} from "framer-motion"
import {Schedule} from '../components/scheduler/schedule'


export const Dash = ()=> {

  return (
   <div className='main'>
  <h1 className='main'>dashboard</h1>
  < div className='schedule'>
    <Schedule/>
  </div>
   </div>
   
   
   

  );
}

