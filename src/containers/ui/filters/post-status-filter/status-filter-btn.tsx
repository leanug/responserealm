'use client'

interface StatusFilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function StatusFilterBtn({ label, isActive, onClick }: StatusFilterButtonProps) {
  return (
    <li>
      <button
        className={`menu-item ${isActive ? 'active' : ''}`}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  )
}

export default StatusFilterBtn
