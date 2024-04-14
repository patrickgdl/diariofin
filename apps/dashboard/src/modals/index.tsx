import { createPushModal } from "pushmodal"
import DialogCategory from "./dialog-category"

export const { pushModal, popModal, popAllModals, replaceWithModal, useOnPushModal, onPushModal, ModalProvider } =
  createPushModal({
    modals: {
      DialogCategory,
    },
  })
