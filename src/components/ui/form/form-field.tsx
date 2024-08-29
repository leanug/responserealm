import React from 'react'

interface LabelComponentProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const FormField: React.FC<LabelComponentProps> = ({ htmlFor, children }) => {
  return (
    <div>
      <label htmlFor={htmlFor} className="form-control flex-col w-full flex gap-0.5">
        {children}
      </label>
    </div>
  )
}