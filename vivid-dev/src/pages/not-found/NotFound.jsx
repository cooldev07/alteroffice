import React from 'react'
import {useNavigate} from "react-router-dom"
import { PrimaryButton } from '../../components'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col h-screen items-center justify-center gap-y-4'>
        <h1 className='text-3xl'>Seems like you are lost</h1>
        <PrimaryButton clickHandler={() => navigate("/home")} >Go back home</PrimaryButton>
    </div>
  )
}

export {NotFound}