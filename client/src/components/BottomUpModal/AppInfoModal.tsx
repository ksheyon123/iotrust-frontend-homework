import React from "react";
import BottomUpModal from "./BottomUpModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppInfoModalProps {
  onClose: () => void;
  dappItem?: DAppItem;
}

const AppInfoModal: React.FC<AppInfoModalProps> = ({ onClose, dappItem }) => {
  const { currentLanguage, lngSets } = useLanguage();

  // 현재 언어에 맞는 DApp 데이터 선택

  const handleServiceRedirect = () => {
    window.open(localizedDApp.service_url, "_blank");
  };

  if (!dappItem) return null;

  const localizedDApp = dappItem[currentLanguage];

  return (
    <div className="relative py-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="닫기"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* App Info Content */}
      <div className="pr-8">
        {/* App Icon and Basic Info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={localizedDApp.image_url}
              alt={`${localizedDApp.name} 아이콘`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // 이미지 로드 실패 시 기본 아이콘 표시
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MF9saW5lYXJfMV8xIiB4MT0iMCIgeTE9IjAiIHgyPSI2NCIgeTI9IjY0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM0Qzc5RkYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOEY0NEZEIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2Zz4K";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {localizedDApp.name}
            </h2>
            <p className="text-blue-600 text-sm break-all">
              {localizedDApp.service_url}
            </p>

            {/* Networks */}
            {localizedDApp.networks.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {localizedDApp.networks.map((network, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {network}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {localizedDApp.description}
          </p>
        </div>

        {/* Service Button */}
        <button
          onClick={handleServiceRedirect}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200 shadow-sm"
        >
          {lngSets.go_to_dapp}
        </button>
      </div>
    </div>
  );
};

export default AppInfoModal;
