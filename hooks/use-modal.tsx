import { create } from "zustand";

type ModalType = "uploadImage" | "createPost";

interface ModalData {
  apiUrl?: string;
  title?: string;
  type?: string;
  onImageSubmit?: (link: string) => void;
}

interface ModalStore {
  type: string;
  isOpen: boolean;
  data: ModalData;
  onClose: () => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: "",
  data: {},
  isOpen: false,
  onOpen: (type: string, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, data: {}, type: "" }),
}));
