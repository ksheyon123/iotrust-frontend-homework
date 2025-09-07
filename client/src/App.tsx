import React from "react";
import "@/index.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                IoTrust Frontend
              </h1>
            </div>
            <nav className="flex space-x-8">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                홈
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                서비스
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                문의
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            React + TypeScript + Webpack + TailwindCSS
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            개발 환경이 성공적으로 구성되었습니다!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                React 18
              </h3>
              <p className="text-gray-600">
                최신 React 기능과 함께 현대적인 UI를 구축하세요.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                TypeScript
              </h3>
              <p className="text-gray-600">
                타입 안정성과 개발자 경험을 향상시키는 TypeScript를 사용합니다.
              </p>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                TailwindCSS
              </h3>
              <p className="text-gray-600">
                유틸리티 우선 CSS 프레임워크로 빠른 스타일링이 가능합니다.
              </p>
            </div>
          </div>

          <div className="mt-12 space-x-4">
            <button className="btn-primary">시작하기</button>
            <button className="btn-secondary">문서 보기</button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 IoTrust Frontend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
