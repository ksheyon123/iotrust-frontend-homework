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

## 3.3 IMAGE_BASE_URL 환경 변수로 변환

```
https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/을 환경 변수로 변경합니다.
```

## 3.4 샘플 데이터 전체 변경 요청

```
MoonPay

이미지 아이콘: icon_moonpay.png
URL: https://buy.moonpay.com
영문: MoonPay offers simple and safer way to buy crypto instantly using VISA/Mastercard payment
비고: 영어를 사용하는 아이폰 사용자에게만 노출 됩니다.
FTSO Portal

이미지 아이콘: icon_ftso.png
URL: https://ftsoportal.com/
영문: FTSO Portal is a service by D’CENT to provide fast and easy way to delegate Vote Power to the user’s favorite FTSO provider. By delegating Vote Power, users can earn passive income as reward.
국문: FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다. 사용자는 Vote Power 위임을 통해 패시브인컴(passive income)을 보상으로 받을 수 있습니다.
지원네트워크: Songbird, Flare
Astar Portal

이미지 아이콘: icon_astar.png
URL: https://portal.astar.network/
영문: Astar Portal is the official Astar Network application for using everything that Astar Network offers.
국문: 아스타포탈은 Astar Network에서 제공하는 모든 것을 사용하기 위한 Astar Network의 공식 애플리케이션입니다.
지원네트워크: Astar
비고: dev/stage 환경에서만 노출 됩니다.
1inch

이미지 아이콘: icon_1inch.png
URL: https://app.1inch.io/
영문: 1inch is a decentralized exchange (DEX) aggregator. It's designed to roll liquidity and pricing from all major DEXes into one platform, making it easy to get the best price for the desired trade.
국문: 1inch는 모든 주요 DEX 거래소의 유동성과 가격 정보를 하나의 플랫폼에서 제공합니다. 원하는 거래의 가격을 쉽게 조회하여 토큰을 교환할 수 있습니다.
지원네트워크: Ethereum
XDSea

이미지 아이콘: icon_xdsea.png
영문: XDSea is the world's first and largest peer-to-peer decentralized marketplace for buying and selling NFTs built on the XDC Network.
국문: XDSea는 XDC 네트워크에 구축된 NFT를 사고 파는 세계 최초이자 최대 규모의 P2P 분산형 시장입니다.
지원네트워크: XDC Network
Compound

이미지 아이콘: icon_compound.png
URL: https://app.compound.finance/
영문: Compound is Ethereum's algorithmic money market protocol that allows users to earn interest or borrow assets through collateral. Anyone can supply assets to Compound's liquidity pool and earn continuous compound interest immediately.
Compound는 담보를 통해 이자를 얻거나 자산을 빌릴 수 있는 이더리움 기반의 머니 마켓 프로토콜입니다. 컴파운드의 유동성 풀에 자산을 공급하면 복리이자를 얻을 수 있습니다.
지원네트워크: Ethereum
PoolTogether

이미지 아이콘: icon_pooltogether.png
URL: https://app.pooltogether.com/
영문: PoolTogether is an Ethereum based application that makes saving money as fun as a game. You join a pool by getting a “savings ticket”. Each Savings Ticket gives you a chance to win a prize, but even if you don’t win, you keep all your money!
국문: PoolTogether는 저축을 재미있게 하는 이더리움 기반의 서비스입니다. 자산을 예치하면 “저축 티켓“을 받아 '풀'에 참여합니다. 각 저축 티켓은 풀에서 발생한 이자를 받을 수있는 기회를 제공하지만, 당첨되지 않더라도 손실이 없습니다.
지원네트워크: Ethereum
OpenSea

이미지 아이콘: icon_opensea.png
URL: https://opensea.io/
영문: OpenSea is a marketplace for digital goods, including collectibles, game items, digital art, and other digital assets backed by blockchain such as Ethereum.
국문: OpenSea는 수집품, 게임 아이템, 디지털 아트와 같은 이더리움 기반의 디지털 상품 및 디지털 자산을 거래할 수 있는 마켓 플레이스입니다.
지원네트워크: Ethereum, Polygon
BlueWhale

이미지 아이콘: icon_bluewhale.png
URL: https://bwpm.io/
국문: 블루웨일 프로토콜은 사용하기 쉬운 디파이 서비스를 지향하는 프로젝트입니다. 디파이 대시보드, DEX 어그리게이터, 자동 재예치 서비스 등 탈중앙화 금융(DeFi) 관련 서비스 제공을 통해 클레이튼 디파이 생태계 활동을 더 쉽고 효율적으로 만듭니다.
지원네트워크: Kaia
한국어 사용자들에게만 노출 됩니다.

전달한 목록 dapp_list API 에 적용해줘
```

# 3.5 i18n 적용

## 3.5.1 i18n 데이터 포맷 검토 요청

```
{
  "status": 200,
  "code": 1000,
  "data": [
    {
      "ko": {
        "banner_url": "...",
        "banner_link": "...",
        "banner_desc": "...",
        "banner_btn_text": "..."
      },
      "en": {
        "banner_url": "...",
        "banner_link": "...",
        "banner_desc": "...",
        "banner_btn_text": "..."
      }
    }
  ]
}

이 포맷과

{
  "data": [
    {
      "id": "banner_1",
      "banner_url": "...",
      "banner_desc": "...",
      "translations": {
        "ko": { "banner_desc": "한국어 설명" },
        "en": { "banner_desc": "English description" }
      }
    }
  ]
}

두 포맷을 비교합니다.
```

## 3.5.2 i18n 두 번째 포맷으로 banner_list 와 dapp_list를 변경 요청

```
i18n 두 번째 포맷으로 banner_list 와 dapp_list를 변경합니다.
```

## 3.5.3 첫 번쨰 포맷으로 재변경

```
현재 서버에서 사용하는 응답 형식을
  {
    "ko" : {
        "banner_name" : "캠페인 마포 에어드랍",
        "banner_url": f"{settings.IMAGE_BASE_URL}banner_mapo_kr.png",
        ...
    },
    "en" : {
        "banner_name" : "campaign_mapo_airdrop",
        "banner_url" : f"{settings.IMAGE_BASE_URL}banner_mapo_en.png"
        ...
    }
  }

이 형태로 변경합니다. 또한, Client의 관련 코드를 변경합니다.
```

# 3.6 Favorite 적용

## DAppItem 기준 즐겨찾기 아이콘 추가

```
FavoriteItem 우측에 노란색 별표를 추가합니다. 즐겨찾기 추가 삭제에 사용되는 버튼입니다.
```

## Favorite의 Modal 컴포넌트 코드 작성 요청

```
Modal 컴포넌트를 생성합니다. 이때, 해당 모달 컴포넌트는 ModalContext를 통해 호출하며 해당 컨텍스트는 onReject, onConfirm 함수를 받습니다.
```
