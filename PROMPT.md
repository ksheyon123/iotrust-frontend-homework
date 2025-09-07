# 1. 개발 환경 구축

# 1.1 환경 설정 Prompt

```
React / webpack / typescript(absolute path) / tailwindcss / public/index.html로 client에 프론트 엔드 개발 환경 구성해줘
```

# 2. 컴포넌트 작성

# 2.1 Carousel

## 2.1.1 기본 구성 요청

```
React / tailwind 를 사용하는데 Carosel 컴포넌트를 만드려고 합니다.
touchmove 이벤트로 Swape해서 넘길 수 있으며 우측 하단에 item의 index가 1 / 2와 같이 표시됩니다.
내부 컨텐츠는 부모 컴포넌트에서 전달합니다.
이때, dots와 네비게이션 버튼은 불필요하고 timer를 전달하여 일정 시간에 다음 아이템으로 넘어갑니다.
```

## 2.1.2 Infinite

```
제대로 작성되었습니다. 다만, 마지막 슬라이드 이후에 처음으로 back해서 돌아가는데 Infinite 하게 보여야합니다. Infinite swape를 구현하기 위해서는 Slide 되어 넘어간 item이 목록의 마지막으로 이동해야합니다.
```

# 2.2 List

## 2.2.1 기본 구성 요청

```
List 컴포넌트를 만드려고 합니다. 이떄, RenderProps 형태가 될 수 있도록 List 컴포넌트를 작성합니다.
```

# 2.3 Button

## 2.3.1 기본 구성 요청

```
Button 컴포넌트 코드를 작성합니다.

CTA, Ghost, Icon 스타일이 존재합니다.
```

# 2.4 Title

## 2.4.1 기본 구성 요청

```
import { ReactNode } from "react";

interface TitleProps<T> {
  children: (props: T) => ReactNode;
  data: T;
  className? : string;
}

const Title = <T,>({ children, data, className }: TitleProps<T>) => {
  return <div className={`${className}`}>{children(data)}</div>;
};

export default Title;

Generic, RenderProps 컴포넌트로 작성했어 검토해봐
```

# 3. 서버 환경 구축

## 3.1 환경 설정 프롬프트

```
Server 쪽에 DjangoRestFramwork 환경 구축합니다. App 이름은 iotrust-server이고 React 프로젝트의 서버로도 사용하려고 합니다. 또한, DB, Authentication은 사용하지 않습니다.

또한, requirements.txt를 작성합니다.

Python 환경은 conda activate iotrust로 사용합니다.
```

## 3.2 API SPEC 기준 코드 작성 요청

```
SERVICE_API_SPEC 맞춰서 작업해줘
```
