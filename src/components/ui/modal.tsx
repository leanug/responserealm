'use client'

import {useModalStore}  from '@/store/use-modal-store'

/**
 * Modal component that renders a modal dialog.
 * @returns {JSX.Element|null} The JSX element representing
 * the modal or null if the modal is not active.
 */
export const Modal = () => {
  const { modalContent, modalTitle, handleModal, modal } = useModalStore()

  return modal ? (
    
      <dialog id="my_modal_3" className="modal" open>
        <div className="modal-box">
          <button
            onClick={() => handleModal()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
              ✕
          </button>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    
  ) : null
}