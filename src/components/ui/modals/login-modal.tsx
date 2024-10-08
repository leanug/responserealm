'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'

import AuthContent from '@/components/auth/auth-content'
import {useModalStore}  from '@/store/use-modal-store'
import { useEffect } from 'react'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing
 * the modal or null if the modal is not active.
 */
const LoginModal: React.FC = () => {
  const {openModal, closeModal, setOpenModal} = useModalStore()
  const {status} = useSession()
  
  useEffect(() => {
    if (status === 'authenticated') {
      setOpenModal('')
    }
  }, [status, setOpenModal])

  return openModal === 'login-modal' ? (
    <div
      className="
        fixed h-screen w-screen top-0 left-0 flex 
        justify-center items-center z-30"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    >
      <dialog id="login-modal" className="modal" open>
        <div className="modal-box">
          <button
            onClick={() => closeModal()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
          <AuthContent />
        </div>
      </dialog>
    </div>
  ) : null
}

export default LoginModal