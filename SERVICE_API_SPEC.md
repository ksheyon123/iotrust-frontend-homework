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

배너 목록 요청 API 엔드포인트입니다.

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
          "ko" :"...",
          "en" : "..."
        },
        "banner_link":{
          "ko" :"...",
          "en" : "..."
        },
        "banner_desc": {
          "ko" :"...",
          "en" : "..."
        },
        "banner_btn_text": {
          "ko" :"...",
          "en" : "..."
        },
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
