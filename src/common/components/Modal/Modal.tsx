import React from "react";
import s from "./modal.module.css";
import { createPortal } from "react-dom";

type Props = {
  isVisible: boolean
  children?: React.ReactNode
  onClose: (isVisible: boolean) => void
}
export const Modal = ({ children, isVisible, onClose }: Props): React.ReactPortal | null => {

  // @ts-ignore
  return createPortal(isVisible && <div className={s.overlay} onClick={() => onClose(false)}>
    <div className={s.modal} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>,
    document.body
  );
};
