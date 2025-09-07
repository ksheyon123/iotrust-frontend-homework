import React, { useEffect, useState } from "react";

interface BottomUpSlideProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

const BottomUpModal: React.FC<BottomUpSlideProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // 다음 프레임에서 애니메이션 시작
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // 애니메이션 완료 후 DOM에서 제거
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // transition duration과 일치

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // 스크롤 방지
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black opacity-50
          ${overlayClassName}
        `}
        onClick={handleOverlayClick}
      />

      {/* Slide Panel */}
      <div
        className={`
          absolute bottom-0 left-0 right-0
          bg-white rounded-t-xl shadow-2xl
          ${className}
        `}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default BottomUpModal;
