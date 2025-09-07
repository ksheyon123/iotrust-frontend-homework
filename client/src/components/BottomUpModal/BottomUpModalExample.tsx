import { useState } from "react";
import BottomUpModal from "./BottomUpModal";

// Demo App
const BottomUpModalExample = () => {
  const [isSlideOpen, setIsSlideOpen] = useState(false);

  const openSlide = () => setIsSlideOpen(true);
  const closeSlide = () => setIsSlideOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          BottomUpSlide Demo
        </h1>

        <div className="space-y-4">
          <button
            onClick={openSlide}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg font-medium"
          >
            슬라이드 패널 열기
          </button>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">사용법</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 버튼을 클릭하여 슬라이드 패널을 엽니다</li>
              <li>• 오버레이를 클릭하거나 ESC키로 닫을 수 있습니다</li>
              <li>• 부드러운 애니메이션으로 하단에서 올라옵니다</li>
            </ul>
          </div>
        </div>
      </div>

      <BottomUpModal
        isOpen={isSlideOpen}
        onClose={closeSlide}
        className="max-h-96 overflow-y-auto"
      >
        <div className="py-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🎉 슬라이드 패널
          </h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              안녕하세요! 이것은 하단에서 올라오는 슬라이드 패널입니다.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium mb-2 text-blue-800">✨ 주요 기능</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 하단에서 슬라이드업 애니메이션</li>
                <li>• 오버레이 클릭으로 닫기</li>
                <li>• ESC 키로 닫기</li>
                <li>• 백그라운드 스크롤 방지</li>
                <li>• TypeScript 지원</li>
                <li>• Tailwind CSS 스타일링</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-medium mb-2 text-green-800">
                📱 모바일 친화적
              </h3>
              <p className="text-sm text-green-700">
                모바일 앱과 같은 UX를 제공하는 Bottom Sheet 패턴을 구현했습니다.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={closeSlide}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                onClick={closeSlide}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </BottomUpModal>
    </div>
  );
};

export default BottomUpModalExample;
