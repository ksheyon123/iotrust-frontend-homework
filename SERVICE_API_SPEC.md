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
  "data": {
    "ko": [
      {
        "ko": {
          "banner_name": "배너 이름 (한국어)",
          "banner_url": "배너 이미지 URL (한국어)",
          "banner_link": "배너 클릭 시 이동할 링크 (한국어)",
          "banner_desc": "배너 설명 텍스트 (한국어)",
          "banner_btn_text": "배너 버튼 텍스트 (한국어)"
        },
        "en": {
          "banner_name": "Banner name (English)",
          "banner_url": "Banner image URL (English)",
          "banner_link": "Banner click destination link (English)",
          "banner_desc": "Banner description text (English)",
          "banner_btn_text": "Banner button text (English)"
        }
      }
    ],
    "en": [
      {
        "ko": {
          "banner_name": "배너 이름 (한국어)",
          "banner_url": "배너 이미지 URL (한국어)",
          "banner_link": "배너 클릭 시 이동할 링크 (한국어)",
          "banner_desc": "배너 설명 텍스트 (한국어)",
          "banner_btn_text": "배너 버튼 텍스트 (한국어)"
        },
        "en": {
          "banner_name": "Banner name (English)",
          "banner_url": "Banner image URL (English)",
          "banner_link": "Banner click destination link (English)",
          "banner_desc": "Banner description text (English)",
          "banner_btn_text": "Banner button text (English)"
        }
      }
    ]
  }
}
```

**응답 필드 설명**

- `data.ko`: 한국어 사용자를 위한 배너 목록
- `data.en`: 영어 사용자를 위한 배너 목록
- 각 배너 아이템은 `ko`와 `en` 객체를 포함:
  - `banner_name`: 배너 이름
  - `banner_url`: 배너 이미지의 URL 주소
  - `banner_link`: 배너 클릭 시 이동할 대상 URL
  - `banner_desc`: 배너에 표시될 설명 텍스트
  - `banner_btn_text`: 배너 내 버튼에 표시될 텍스트

**사용 예시**

```json
{
  "status": 200,
  "code": 1000,
  "data": {
    "ko": [
      {
        "ko": {
          "banner_name": "캠페인 마포 에어드랍",
          "banner_url": "https://example.com/banner_mapo_kr.png",
          "banner_link": "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
          "banner_desc": "특별 프로모션 이벤트",
          "banner_btn_text": "자세히 보기"
        },
        "en": {
          "banner_name": "campaign_mapo_airdrop",
          "banner_url": "https://example.com/banner_mapo_en.png",
          "banner_link": "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
          "banner_desc": "Special Promotion Event",
          "banner_btn_text": "Learn More"
        }
      }
    ],
    "en": [
      {
        "ko": {
          "banner_name": "캠페인 마포 에어드랍",
          "banner_url": "https://example.com/banner_mapo_kr.png",
          "banner_link": "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
          "banner_desc": "특별 프로모션 이벤트",
          "banner_btn_text": "자세히 보기"
        },
        "en": {
          "banner_name": "campaign_mapo_airdrop",
          "banner_url": "https://example.com/banner_mapo_en.png",
          "banner_link": "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
          "banner_desc": "Special Promotion Event",
          "banner_btn_text": "Learn More"
        }
      }
    ]
  }
}
```

### 4.4 DApp List 요청

DApp 목록 요청 API 엔드포인트입니다. 각 DApp은 한국어와 영어를 지원하는 다국어 구조로 되어 있습니다.

**GET 요청**

- **URL**: `/api/v1/dapp/`
- **Method**: `GET`
- **Parameters**: 없음

**응답**

```json
{
  "status": 200,
  "code": 1000,
  "data": {
    "ko": [
      {
        "ko": {
          "name": "DApp 이름 (한국어)",
          "image_url": "DApp 아이콘 이미지 URL",
          "service_url": "DApp 서비스 URL",
          "description": "DApp 설명 (한국어)",
          "networks": ["지원 네트워크 목록"],
          "condition": ["노출 조건"]
        },
        "en": {
          "name": "DApp name (English)",
          "image_url": "DApp icon image URL",
          "service_url": "DApp service URL",
          "description": "DApp description (English)",
          "networks": ["Supported networks"],
          "condition": ["Display conditions"]
        }
      }
    ],
    "en": [
      {
        "ko": {
          "name": "DApp 이름 (한국어)",
          "image_url": "DApp 아이콘 이미지 URL",
          "service_url": "DApp 서비스 URL",
          "description": "DApp 설명 (한국어)",
          "networks": ["지원 네트워크 목록"],
          "condition": ["노출 조건"]
        },
        "en": {
          "name": "DApp name (English)",
          "image_url": "DApp icon image URL",
          "service_url": "DApp service URL",
          "description": "DApp description (English)",
          "networks": ["Supported networks"],
          "condition": ["Display conditions"]
        }
      }
    ]
  }
}
```

**응답 필드 설명**

- `data.ko`: 한국어 사용자를 위한 DApp 목록
- `data.en`: 영어 사용자를 위한 DApp 목록
- 각 DApp 아이템은 `ko`와 `en` 객체를 포함:
  - `name`: DApp 이름
  - `image_url`: DApp 아이콘 이미지 URL
  - `service_url`: DApp 서비스 URL
  - `description`: DApp 설명
  - `networks`: 지원하는 블록체인 네트워크 목록
  - `condition`: DApp 노출 조건 (언어, 환경 등)

**사용 예시**

```json
{
  "status": 200,
  "code": 1000,
  "data": {
    "ko": [
      {
        "ko": {
          "name": "FTSO Portal",
          "image_url": "https://example.com/icon_ftso.png",
          "service_url": "https://ftsoportal.com/",
          "description": "FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다.",
          "networks": ["Songbird", "Flare"],
          "condition": []
        },
        "en": {
          "name": "FTSO Portal",
          "image_url": "https://example.com/icon_ftso.png",
          "service_url": "https://ftsoportal.com/",
          "description": "FTSO Portal is a service by D'CENT to provide fast and easy way to delegate Vote Power to the user's favorite FTSO provider.",
          "networks": ["Songbird", "Flare"],
          "condition": []
        }
      }
    ],
    "en": [
      {
        "ko": {
          "name": "FTSO Portal",
          "image_url": "https://example.com/icon_ftso.png",
          "service_url": "https://ftsoportal.com/",
          "description": "FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다.",
          "networks": ["Songbird", "Flare"],
          "condition": []
        },
        "en": {
          "name": "FTSO Portal",
          "image_url": "https://example.com/icon_ftso.png",
          "service_url": "https://ftsoportal.com/",
          "description": "FTSO Portal is a service by D'CENT to provide fast and easy way to delegate Vote Power to the user's favorite FTSO provider.",
          "networks": ["Songbird", "Flare"],
          "condition": []
        }
      }
    ]
  }
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
