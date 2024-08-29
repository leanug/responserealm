import React from 'react'

interface FormErrorProps {
  children: React.ReactNode;
}

export const FormError: React.FC<FormErrorProps> = ({ children }) => (
  <div className="label">
    <span className="label-text-alt text-red-500">{children}</span>
  </div>
);
