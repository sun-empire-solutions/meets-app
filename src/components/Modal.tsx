import { createPortal } from "react-dom";

import { useClassNames } from "../hooks/useClassNames";

const Modal = ({ title, isOpen, body, footer, onClose }: IProps) => {
  const classNames = useClassNames();

  const modal = (
    <div className={classNames("modal", { "is-open": isOpen })}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="title">{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{body}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

type IProps = {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  onClose: () => void;
};

export { Modal };
