import React from 'react'

interface LabelProps {
  children: React.ReactNode;
}

export const FormLabel: React.FC<LabelProps> = ({ children }) => (
  <div className="label">
    <span className="label-text">{children}</span>
  </div>
)
