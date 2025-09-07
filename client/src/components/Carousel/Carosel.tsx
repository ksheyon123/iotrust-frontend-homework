import React, { useState, useEffect, useRef, useCallback } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  timer?: number; // 자동 넘김 타이머 (milliseconds)
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  timer = 0,
  className = "",
}) => {
  const [items, setItems] = useState(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = children.length;

  // 실제 원본 배열에서의 인덱스 계산
  const getOriginalIndex = useCallback(() => {
    const firstItem = items[0];
    return children.findIndex((child) => child === firstItem);
  }, [items, children]);

  // 다음 슬라이드로 이동 (오른쪽으로 스와이프)
  const goToNext = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex(1);

    // 300ms 후 배열 재배열
    setTimeout(() => {
      setItems((prev) => [...prev.slice(1), prev[0]]);
      setCurrentIndex(0);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  // 이전 슬라이드로 이동 (왼쪽으로 스와이프)
  const goToPrev = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);

    // 배열을 먼저 재배열
    setItems((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex(-1);

    // 다음 프레임에서 애니메이션 시작
    requestAnimationFrame(() => {
      setCurrentIndex(0);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    });
  }, [isAnimating]);

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
    setStartX(clientX);
    setTranslateX(0);
    stopTimer();
  };

  // 터치/마우스 이동
  const handleMove = (clientX: number) => {
    if (!isDragging || isAnimating) return;

    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  // 터치/마우스 끝
  const handleEnd = () => {
    if (!isDragging || isAnimating) return;

    setIsDragging(false);

    const threshold = 50; // 최소 드래그 거리
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const dragRatio = Math.abs(translateX) / containerWidth;

    // 드래그 거리나 비율이 충분한지 확인
    if (dragRatio > 0.25 || Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    } else {
      // 원래 자리로 돌아가는 애니메이션
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        restartTimer();
      }, 300);
    }

    setTranslateX(0);
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

  // children이 변경되면 items 업데이트
  useEffect(() => {
    setItems(children);
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
        {items.map((child, index) => (
          <div
            key={`slide-${getOriginalIndex()}-${index}`}
            className="flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>

      {/* 인덱스 표시 */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
        {displayIndex + 1} / {totalItems}
      </div>

      {/* 디버그 정보 (개발용) */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 text-black px-2 py-1 rounded text-xs">
        Dragging: {isDragging ? "Yes" : "No"} | Animating:{" "}
        {isAnimating ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default Carousel;
