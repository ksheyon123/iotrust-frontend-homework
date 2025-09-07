# 사용한 기술 스택

1. React / Tailwindcss / Webpack

# 프로젝트 실행 및 빌드 방법 설명

## 1. LOCAL 환경 실행

### 1.1 클라이언트 및 서버 실행

```
# 클라이언트 실행

cd client && npm run dev

# 서버 실행

cd server && python manage.py runserver

```

## 2. DEV 환경 실행

### 2.1 클라이언트 및 서버 실행

```
# docker-compose.yml

docker compose -f docker-compose-dev.yml up -d --build


```

## 3. STAGE 환경 실행

### 3.1 클라이언트 및 서버 실행

```
# docker-compose.yml

docker compose -f docker-compose-stage.yml up -d --build

```

## 3. PROD 환경 실행

### 3.1 클라이언트 및 서버 실행

```
# docker-compose.yml

docker compose -f docker-compose-prod.yml up -d --build

```

# 구현한 주요 요소 설명

## Client (Frontend)

### 🏗️ 아키텍처 및 기술 스택

- **React 18** + **TypeScript**: 타입 안전성을 보장하는 모던 React 애플리케이션
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크로 빠른 스타일링
- **Webpack 5**: 모듈 번들러 및 개발 서버 구성
- **Context API**: 전역 상태 관리 (언어, 모달)

### 🎨 주요 컴포넌트

- **Layout**: 전체 페이지 레이아웃 구조
- **Banner**: 캐러셀 배너 컴포넌트
- **Carousel**: 이미지/콘텐츠 슬라이더
- **List**: 재사용 가능한 리스트 컴포넌트
- **DAppItem**: DApp 정보를 표시하는 아이템 컴포넌트
- **FavoriteItem**: 즐겨찾기 아이템 컴포넌트
- **Modal**: 일반 모달 및 BottomUpModal
- **Button**: 재사용 가능한 버튼 컴포넌트
- **Title**: 섹션 제목 컴포넌트

### 🌐 다국어 지원

- **LanguageContext**: React Context를 활용한 다국어 상태 관리
- **동적 언어 전환**: URL 파라미터(`?lng=ko|en`)를 통한 언어 설정
- **언어별 리소스**: `/public/language/` 폴더의 JSON 파일로 관리

### 🔄 상태 관리

- **ModalContext**: 모달 상태 및 동작 관리
- **Custom Hooks**: `useLanguage`, `useModal` 등 재사용 가능한 로직

### 📱 플랫폼 대응

- **플랫폼 감지**: iOS, Android, Web 환경 자동 감지
- **조건부 렌더링**: 플랫폼, 언어, 환경별 콘텐츠 필터링
- **반응형 디자인**: Tailwind CSS를 활용한 모바일 우선 디자인

### 🔌 API 통신

- **HTTP 클라이언트**: 중앙화된 API 통신 관리
- **비동기 데이터 처리**: Promise.all을 활용한 병렬 데이터 로딩
- **타입 안전성**: TypeScript 인터페이스로 API 응답 타입 정의

### 🚀 빌드 및 배포

- **다중 환경 지원**: local, dev, stage, prod 환경별 빌드 설정
- **Docker 컨테이너화**: 환경별 Dockerfile 제공
- **환경 변수 관리**: `.env` 파일을 통한 설정 관리

# 제한 시간 내 구현하지 못한 부분 & 보완하고 싶은 점 등
