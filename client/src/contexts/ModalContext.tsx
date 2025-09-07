import ContextModal from "@/components/Modal/ContextModal";
import React, { createContext, ReactNode, useContext, useState } from "react";

// Modal 설정 타입 정의
interface ModalConfig {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Modal Context 타입 정의
interface ModalContextType {
  isOpen: boolean;
  config: ModalConfig;
  showModal: (
    config: ModalConfig,
    onConfirm?: () => void | Promise<void>,
    onReject?: () => void | Promise<void>
  ) => void;
  hideModal: () => void;
  confirm: () => void;
  reject: () => void;
}

// Provider Props 타입 정의
interface ModalContextProviderProps {
  children: ReactNode;
}

// 기본값 설정
const defaultConfig: ModalConfig = {
  title: "",
  message: "",
  confirmText: "확인",
  cancelText: "취소",
  size: "md",
  showCloseButton: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
};

// Context 생성
export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  config: defaultConfig,
  showModal: () => {},
  hideModal: () => {},
  confirm: () => {},
  reject: () => {},
});

// Provider 컴포넌트
export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>(defaultConfig);
  const [onConfirmCallback, setOnConfirmCallback] = useState<
    (() => void | Promise<void>) | null
  >(null);
  const [onRejectCallback, setOnRejectCallback] = useState<
    (() => void | Promise<void>) | null
  >(null);

  const showModal = (
    modalConfig: ModalConfig,
    onConfirm?: () => void | Promise<void>,
    onReject?: () => void | Promise<void>
  ) => {
    setConfig({ ...defaultConfig, ...modalConfig });
    setOnConfirmCallback(() => onConfirm || null);
    setOnRejectCallback(() => onReject || null);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setConfig(defaultConfig);
    setOnConfirmCallback(null);
    setOnRejectCallback(null);
  };

  const confirm = async () => {
    if (onConfirmCallback) {
      try {
        await onConfirmCallback();
      } catch (error) {
        console.error("Modal confirm callback error:", error);
      }
    }
    hideModal();
  };

  const reject = async () => {
    if (onRejectCallback) {
      try {
        await onRejectCallback();
      } catch (error) {
        console.error("Modal reject callback error:", error);
      }
    }
    hideModal();
  };

  const value: ModalContextType = {
    isOpen,
    config,
    showModal,
    hideModal,
    confirm,
    reject,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <ContextModal />
    </ModalContext.Provider>
  );
};

// Custom Hook
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalContextProvider");
  }
  return context;
};
