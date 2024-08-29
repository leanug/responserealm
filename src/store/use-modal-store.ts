import { create } from 'zustand'

interface ModalStore {
  openModal: string | null; // Keeps track of the currently open modal
  setOpenModal: (modalName: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  setOpenModal: (modalName) => set({ openModal: modalName }),
  closeModal: () => set({ openModal: null }),
}))