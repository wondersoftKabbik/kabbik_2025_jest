import React from 'react'

const MenuIcons = ({color}:{color?:string}) => {
  return (
    <>
        <svg style={{width:'100%',height:"100%"}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6H20M4 12H20M4 18H20" stroke={color??"#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </>
  )
}

export default MenuIcons