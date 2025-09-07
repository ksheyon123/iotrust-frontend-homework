# SERVICE API 명세서

## 1. 기본 정보

- **Base URL**: `/api/v1/`
- **Parameters** : ko | en
- **응답 형식**: JSON

## 2. 응답 형식

### 성공

모든 응답은 다음과 같은 기본 구조를 가집니다:

```json
{
    "status": 200,
    "code": 1000,
    "data": {...},
}
```

### 실패

```json
{
    "status": 200,
    "code": 1000,
    "message": {...},
}
```

## 3. 응답 코드

### 성공 코드

- `1000`: 일반 성공
- `1001`: 생성 성공 (201 Created)
- `1002`: 내용 없음 (204 No Content)

### 에러 코드

- `4000`: 일반 클라이언트 에러 (400 Bad Request)
- `4040`: 리소스를 찾을 수 없음 (404 Not Found)
- `5000`: 서버 내부 에러 (500 Internal Server Error)

## 4. API 엔드포인트

### 4.1. Health Check

서버 상태를 확인하는 API입니다.

**요청**

- **URL**: `/api/v1/health/`
- **Method**: `GET`
- **Parameters**: 없음

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": {
    "message": "IoTrust Server is running!",
    "version": "1.0.0"
  }
}
```

### 4.2. API Test

테스트용 API 엔드포인트입니다.

**GET 요청**

- **URL**: `/api/v1/test/`
- **Method**: `GET`
- **Parameters**: 없음

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": {
    "server": "iotrust-server",
    "framework": "Django REST Framework"
  }
}
```

**POST 요청**

- **URL**: `/api/v1/test/`
- **Method**: `POST`
- **Parameters**: 임의의 JSON 데이터

**요청 예시**

```json
{
  "test_data": "example",
  "number": 123
}
```

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": {
    "test_data": "example",
    "number": 123
  }
}
```

### 4.3 Banner List 요청

배너 목록을 조회하는 API 엔드포인트입니다. 각 배너는 한국어와 영어를 지원하는 다국어 구조로 되어 있습니다.

**GET 요청**

- **URL**: `/api/v1/banner/`
- **Method**: `GET`
- **Parameters**: 없음

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": [
    {
      "banner_url": {
        "ko": "배너 이미지 URL (한국어)",
        "en": "Banner image URL (English)"
      },
      "banner_link": {
        "ko": "배너 클릭 시 이동할 링크 (한국어)",
        "en": "Banner click destination link (English)"
      },
      "banner_desc": {
        "ko": "배너 설명 텍스트 (한국어)",
        "en": "Banner description text (English)"
      },
      "banner_btn_text": {
        "ko": "배너 버튼 텍스트 (한국어)",
        "en": "Banner button text (English)"
      }
    }
  ]
}
```

**응답 필드 설명**

- `banner_url`: 배너 이미지의 URL 주소 (다국어 지원)
- `banner_link`: 배너 클릭 시 이동할 대상 URL (다국어 지원)
- `banner_desc`: 배너에 표시될 설명 텍스트 (다국어 지원)
- `banner_btn_text`: 배너 내 버튼에 표시될 텍스트 (다국어 지원)

**사용 예시**

```json
{
  "status": 200,
  "code": 1000,
  "data": [
    {
      "banner_url": {
        "ko": "https://example.com/banner-ko.jpg",
        "en": "https://example.com/banner-en.jpg"
      },
      "banner_link": {
        "ko": "https://example.com/promotion-ko",
        "en": "https://example.com/promotion-en"
      },
      "banner_desc": {
        "ko": "특별 프로모션 이벤트",
        "en": "Special Promotion Event"
      },
      "banner_btn_text": {
        "ko": "자세히 보기",
        "en": "Learn More"
      }
    }
  ]
}
```

### 4.4 DApp List 요청

DApp 목록 요청 API 엔드포인트입니다.

**GET 요청**

- **URL**: `/api/v1/dapp/`
- **Method**: `GET`
- **Parameters**: 없음

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": [
    {
      "name": "...",
      "image_url": "...",
      "service_url": "...",
      "description": {
        "ko": "...",
        "en": "..."
      },
      "networks": ["..."],
      "condition": ["ko", "en", "dev", "stage", "prod"]
    }
  ]
}
```

### 4.5 Favorite List 요청

즐겨찾기 목록 요청 API 엔드포인트입니다.

**GET 요청**

- **URL**: `/api/v1/favorite/`
- **Method**: `GET`
- **Parameters**: 없음

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": [
    {
      "image_url": "...",
      "service_url": "...",
      "language": {
        "ko": "...",
        "en": "..."
      },
      "networks": ["..."],
      "condition": {
        "visible_language": ["en"],
        "visible_env": ["dev", "stage"]
      }
    }
  ]
}
```
