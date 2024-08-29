import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  type: "button" | "submit" | "reset"
  loading: boolean
}

export const Button: React.FC<ButtonProps> = ({loading, children, type }) => {
  return (
    <button 
      type={type}
      className="btn btn-neutral w-full mt-4"
    >
      { children }
      {loading && <span className="loading loading-spinner loading-sm"></span>}
    </button>
  )
}
