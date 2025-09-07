import React from "react";

// List 컴포넌트의 Props 타입 정의
interface ListProps<T> {
  data: T[];
  children: (item: T, index: number, array: T[]) => React.ReactNode;
  className?: string;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  error?: string | null;
  keyExtractor?: (item: T, index: number) => string | number;
}

// 기본 로딩 컴포넌트
const DefaultLoadingComponent = () => (
  <div className="flex justify-center items-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// 기본 빈 상태 컴포넌트
const DefaultEmptyComponent = () => (
  <div className="text-center p-8 text-gray-500">
    <p>표시할 데이터가 없습니다.</p>
  </div>
);

// 기본 에러 컴포넌트
const DefaultErrorComponent: React.FC<{ error: string }> = ({ error }) => (
  <div className="text-center p-8 text-red-500">
    <p>오류가 발생했습니다: {error}</p>
  </div>
);

// 제네릭 List 컴포넌트
function List<T>({
  data,
  children,
  className = "",
  loading = false,
  loadingComponent,
  emptyComponent,
  errorComponent,
  error = null,
  keyExtractor,
}: ListProps<T>) {
  // 로딩 상태 처리
  if (loading) {
    return (
      <div className={className}>
        {loadingComponent || <DefaultLoadingComponent />}
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className={className}>
        {errorComponent || <DefaultErrorComponent error={error} />}
      </div>
    );
  }

  // 빈 데이터 처리
  if (!data || data.length === 0) {
    return (
      <div className={className}>
        {emptyComponent || <DefaultEmptyComponent />}
      </div>
    );
  }

  // 키 추출 함수 - 사용자가 제공하지 않으면 인덱스를 사용
  const getKey = (item: T, index: number): string | number => {
    if (keyExtractor) {
      return keyExtractor(item, index);
    }
    // 기본적으로 item이 객체이고 id 속성이 있다면 사용, 없으면 인덱스 사용
    if (typeof item === "object" && item !== null && "id" in item) {
      return (item as any).id;
    }
    return index;
  };

  return (
    <div className={className}>
      {data.map((item, index) => (
        <>{children(item, index, data)}</>
      ))}
    </div>
  );
}

export default List;

// 사용 예시들
