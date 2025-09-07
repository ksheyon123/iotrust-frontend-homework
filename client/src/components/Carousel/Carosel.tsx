import React, { useState, useEffect, useRef, useCallback } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  timer?: number; // 자동 넘김 타이머 (milliseconds)
  className?: string;
  onItemClick?: (index: number) => void; // 아이템 클릭 핸들러
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  timer = 0,
  className = "",
  onItemClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(1); // 첫 번째 복사본 다음부터 시작
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasDragged, setHasDragged] = useState(false); // 실제로 드래그가 발생했는지 추적
  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = children.length;

  // 앞뒤로 복사본을 추가한 전체 아이템 배열 생성
  const extendedItems = [
    children[children.length - 1], // 마지막 아이템을 앞에 복사
    ...children, // 원본 아이템들
    children[0], // 첫 번째 아이템을 뒤에 복사
  ];

  // 현재 표시되는 슬라이드의 원본 인덱스 계산
  const getOriginalIndex = useCallback(() => {
    if (currentIndex === 0) return totalItems - 1; // 앞쪽 복사본
    if (currentIndex === totalItems + 1) return 0; // 뒤쪽 복사본
    return currentIndex - 1; // 일반적인 경우
  }, [currentIndex, totalItems]);

  // 다음 슬라이드로 이동 (오른쪽으로 스와이프)
  const goToNext = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    // 마지막 복사본에 도달했을 때 첫 번째 원본으로 점프
    if (nextIndex === totalItems + 1) {
      setTimeout(() => {
        setCurrentIndex(1);
        setIsAnimating(false);
      }, 300);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [isAnimating, currentIndex, totalItems]);

  // 이전 슬라이드로 이동 (왼쪽으로 스와이프)
  const goToPrev = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);

    // 첫 번째 복사본에 도달했을 때 마지막 원본으로 점프
    if (prevIndex === 0) {
      setTimeout(() => {
        setCurrentIndex(totalItems);
        setIsAnimating(false);
      }, 300);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [isAnimating, currentIndex, totalItems]);

  // 타이머 관련 함수들
  const startTimer = useCallback(() => {
    if (timer > 0) {
      timerRef.current = setInterval(goToNext, timer);
    }
  }, [timer, goToNext]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const restartTimer = useCallback(() => {
    stopTimer();
    if (!isDragging && !isAnimating) {
      startTimer();
    }
  }, [stopTimer, startTimer, isDragging, isAnimating]);

  // 터치/마우스 시작
  const handleStart = (clientX: number) => {
    if (isAnimating) return;
    setIsDragging(true);
    setHasDragged(false); // 드래그 시작 시 초기화
    setStartX(clientX);
    setTranslateX(0);
    stopTimer();
  };

  // 터치/마우스 이동
  const handleMove = (clientX: number) => {
    if (!isDragging || isAnimating) return;

    const deltaX = clientX - startX;
    setTranslateX(deltaX);

    // 일정 거리 이상 움직이면 드래그로 간주
    if (Math.abs(deltaX) > 5) {
      setHasDragged(true);
    }
  };

  // 터치/마우스 끝
  const handleEnd = () => {
    if (!isDragging || isAnimating) return;

    const wasDragging = isDragging;
    const finalHasDragged = hasDragged;
    const finalTranslateX = translateX;

    setIsDragging(false);

    const threshold = 50; // 최소 드래그 거리
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const dragRatio = Math.abs(finalTranslateX) / containerWidth;

    // 실제로 드래그가 발생했고 충분한 거리를 움직였는지 확인
    if (
      finalHasDragged &&
      (dragRatio > 0.25 || Math.abs(finalTranslateX) > threshold)
    ) {
      if (finalTranslateX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else if (finalHasDragged) {
      // 드래그했지만 충분하지 않은 경우 - 원래 자리로 돌아가기
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        restartTimer();
      }, 300);
    } else {
      // 드래그하지 않은 경우 - 클릭으로 간주
      if (onItemClick) {
        const originalIndex = getOriginalIndex();
        onItemClick(originalIndex);
      }
      restartTimer();
    }

    setTranslateX(0);
    setHasDragged(false);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleEnd();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // children이 변경되면 currentIndex를 초기화
  useEffect(() => {
    setCurrentIndex(1); // 첫 번째 원본 아이템으로 초기화
  }, [children]);

  // 타이머 효과
  useEffect(() => {
    if (!isDragging && !isAnimating) {
      startTimer();
    }
    return () => stopTimer();
  }, [startTimer, stopTimer, isDragging, isAnimating]);

  // 애니메이션 완료 후 타이머 재시작
  useEffect(() => {
    if (!isAnimating && !isDragging) {
      restartTimer();
    }
  }, [isAnimating, isDragging, restartTimer]);

  // Transform 값 계산
  const getTransform = () => {
    const baseTransform = -currentIndex * 100;
    let dragOffset = 0;

    if (isDragging && translateX !== 0) {
      const containerWidth = carouselRef.current?.offsetWidth || 1;
      dragOffset = (translateX / containerWidth) * 100;
    }

    return `translateX(${baseTransform + dragOffset}%)`;
  };

  // Transition 설정
  const getTransition = () => {
    if (isDragging) {
      return "none";
    }
    if (isAnimating) {
      return "transform 300ms ease-out";
    }
    return "none";
  };

  // 현재 표시되는 슬라이드의 원본 인덱스
  const displayIndex = getOriginalIndex();

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        ref={carouselRef}
        className="flex w-full h-full select-none cursor-grab active:cursor-grabbing"
        style={{
          transform: getTransform(),
          transition: getTransition(),
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {extendedItems.map((child, index) => (
          <div
            key={`slide-${index}`}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>

      {/* 인덱스 표시 */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
        {getOriginalIndex() + 1} / {totalItems}
      </div>
    </div>
  );
};

export default Carousel;
