import { useModalStore } from '@/store/use-modal-store'

function OpenLoginModalBtn() {
  const {setOpenModal} = useModalStore()

  return (
    <button 
        className="btn btn-neutral"
        onClick={() => setOpenModal('login-modal')}
      >
      Login
    </button>
  )
}

export default OpenLoginModalBtn