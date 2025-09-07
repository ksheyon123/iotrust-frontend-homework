import Carousel from "@/components/Carousel/Carosel";

// 사용 예시
const CaroselExample = () => {
  const carouselItems = [
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-full h-full flex items-center justify-center text-white text-4xl font-bold">
      Slide 1
    </div>,
    <div className="bg-gradient-to-br from-green-400 to-green-600 w-full h-full flex items-center justify-center text-white text-4xl font-bold">
      Slide 2
    </div>,
    <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-full h-full flex items-center justify-center text-white text-4xl font-bold">
      Slide 3
    </div>,
    <div className="bg-gradient-to-br from-red-400 to-red-600 w-full h-full flex items-center justify-center text-white text-4xl font-bold">
      Slide 4
    </div>,
  ];

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          True Infinite Carousel - Fixed Swipe
        </h1>

        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <Carousel timer={5000}>{carouselItems}</Carousel>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-lg">
            👆 터치하거나 드래그해서 슬라이드를 넘겨보세요
          </p>
          <p className="text-sm mt-2">
            5초마다 자동으로 다음 슬라이드로 넘어갑니다
          </p>
          <p className="text-sm text-blue-600 font-medium">
            스와이프 감도가 개선되었습니다
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaroselExample;
