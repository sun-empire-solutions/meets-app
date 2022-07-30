import { useRef } from "react";
import { createPortal } from "react-dom";

import { useClassNames, useOutsideClick } from "@/hooks";

const Modal = ({ title, isOpen, body, footer, onClose }: IProps) => {
  const classNames = useClassNames();
  const modalContentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalContentRef, onClose);

  return createPortal(
    <div
      className={classNames("modal", {
        "is-open": isOpen,
        "is-close": !isOpen,
      })}
    >
      <div className={classNames("modal-background", { out: !isOpen })} />
      <div
        className={classNames("modal-content", { out: !isOpen })}
        ref={modalContentRef}
      >
        <div className="modal-header">
          <h2 className="title">{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>,
    document.body
  );
};

type IProps = {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  onClose: () => void;
};

export { Modal };
