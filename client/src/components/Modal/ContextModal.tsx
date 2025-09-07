import React from "react";
import Modal from "./Modal";
import Button from "../Button/Button";
import { useModal } from "../../contexts/ModalContext";

const ContextModal: React.FC = () => {
  const { isOpen, config, confirm, reject, hideModal } = useModal();

  const handleConfirm = () => {
    confirm();
  };

  const handleReject = () => {
    reject();
  };

  const handleClose = () => {
    hideModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={config.title}
      size={config.size}
      showCloseButton={config.showCloseButton}
      closeOnOverlayClick={config.closeOnOverlayClick}
      closeOnEscape={config.closeOnEscape}
    >
      {/* Modal Content */}
      <div className="space-y-4">
        {/* Message */}
        {config.message && (
          <div className="text-gray-700 text-sm leading-relaxed">
            {config.message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="ghost" size="md" onClick={handleReject}>
            {config.cancelText || "취소"}
          </Button>
          <Button variant="cta" size="md" onClick={handleConfirm}>
            {config.confirmText || "확인"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ContextModal;
