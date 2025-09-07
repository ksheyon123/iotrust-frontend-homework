import React from "react";
import Button from "../Button/Button";
import { useModal } from "../../contexts/ModalContext";
import ContextModal from "./ContextModal";

const ModalExample: React.FC = () => {
  const { showModal } = useModal();

  const handleBasicModal = () => {
    showModal({
      title: "기본 모달",
      message: "이것은 기본 모달입니다. 확인 또는 취소를 선택하세요.",
    });
  };

  const handleConfirmModal = () => {
    showModal(
      {
        title: "확인 모달",
        message: "정말로 이 작업을 수행하시겠습니까?",
        confirmText: "실행",
        cancelText: "취소",
      },
      () => {
        alert("확인되었습니다!");
      },
      () => {
        alert("취소되었습니다!");
      }
    );
  };

  const handleDeleteModal = () => {
    showModal(
      {
        title: "삭제 확인",
        message:
          "이 항목을 삭제하면 복구할 수 없습니다. 정말로 삭제하시겠습니까?",
        confirmText: "삭제",
        cancelText: "취소",
        size: "md",
      },
      async () => {
        // 비동기 작업 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("삭제가 완료되었습니다!");
      },
      () => {
        console.log("삭제가 취소되었습니다.");
      }
    );
  };

  const handleCustomModal = () => {
    showModal(
      {
        title: "사용자 정의 모달",
        message:
          "이 모달은 사용자 정의 설정을 사용합니다. ESC 키로 닫을 수 없고, 오버레이 클릭으로도 닫을 수 없습니다.",
        confirmText: "동의",
        cancelText: "거부",
        size: "lg",
        closeOnEscape: false,
        closeOnOverlayClick: false,
        showCloseButton: false,
      },
      () => {
        alert("동의하셨습니다!");
      },
      () => {
        alert("거부하셨습니다!");
      }
    );
  };

  const handleLargeModal = () => {
    showModal({
      title: "큰 모달",
      message:
        "이것은 큰 크기의 모달입니다. 더 많은 내용을 표시할 수 있습니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      size: "xl",
      confirmText: "확인",
      cancelText: "닫기",
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Modal Context 예제</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button variant="cta" onClick={handleBasicModal}>
          기본 모달
        </Button>

        <Button variant="cta" onClick={handleConfirmModal}>
          확인 모달
        </Button>

        <Button variant="cta" onClick={handleDeleteModal}>
          삭제 확인 모달
        </Button>

        <Button variant="cta" onClick={handleCustomModal}>
          사용자 정의 모달
        </Button>

        <Button variant="cta" onClick={handleLargeModal}>
          큰 모달
        </Button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">사용법:</h3>
        <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
          {`// 1. ModalContextProvider로 앱을 감싸기
<ModalContextProvider>
  <App />
  <ContextModal /> {/* 모달 컴포넌트 추가 */}
</ModalContextProvider>

// 2. useModal 훅 사용
const { showModal } = useModal();

// 3. 모달 호출
showModal(
  {
    title: "제목",
    message: "메시지",
    confirmText: "확인",
    cancelText: "취소"
  },
  onConfirm, // 확인 콜백
  onReject   // 취소 콜백
);`}
        </pre>
      </div>
    </div>
  );
};

export default ModalExample;
