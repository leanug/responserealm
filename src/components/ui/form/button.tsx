import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  type: "button" | "submit" | "reset"
  loading: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({loading, children, type, disabled }) => {
  return (
    <button 
      type={type}
      className="btn btn-neutral w-full mt-4"
      disabled={disabled}
    >
      { children }
      {loading && <span className="loading loading-spinner loading-sm"></span>}
    </button>
  )
}
