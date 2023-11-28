import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa' 
export const Todo = ({todo}) => {
  return (

      <li>
        <div >
          <input type ="checkbox"/>
          <p>{todo}</p>
        </div>
        <button >{<FaRegTrashAlt/>}</button>
      </li>

  )
}

