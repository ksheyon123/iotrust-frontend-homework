from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from iotrust_server.utils.response import ApiResponseWrapper


@api_view(['GET'])
def health_check(request):
    """
    서버 상태 확인용 API
    """
    return ApiResponseWrapper.success(
        data={
            'message': 'IoTrust Server is running!',
            'version': '1.0.0'
        },
        code=1000
    )


@api_view(['GET', 'POST'])
def api_test(request):
    """
    테스트용 API 엔드포인트
    """
    if request.method == 'GET':
        return ApiResponseWrapper.success(
            data={
                'server': 'iotrust-server',
                'framework': 'Django REST Framework'
            },
            code=1000
        )
    
    elif request.method == 'POST':
        return ApiResponseWrapper.success(
            data=request.data,
            code=1000
        )


@api_view(['GET'])
def banner_list(request):
    """
    배너 목록 요청 API
    """
    # 샘플 배너 데이터
    banner_data = [
        {
            "banner_name" : {
                "ko" : "캠페인 마포 에어드랍",
                "en" : "campaign_mapo_airdrop"
            },
            "banner_url": {
                "ko": f"{settings.IMAGE_BASE_URL}banner_mapo_kr.png",
                "en": f"{settings.IMAGE_BASE_URL}banner_mapo_en.png"
            },
            "banner_link": {
                "ko": "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
                "en": "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol"
            },
            "banner_desc": {
                "ko": "특별 프로모션 이벤트",
                "en": "Special Promotion Event"
            },
            "banner_btn_text": {
                "ko": "자세히 보기",
                "en": "Learn More"
            }
        },
        {
            "banner_name" : {
                "ko" : "디센트 월렛",
                "en" : "D'CENT Wallet"
            },
            "banner_url": {
                "ko": f"{settings.IMAGE_BASE_URL}banner_dcent.png",
                "en": f"{settings.IMAGE_BASE_URL}banner_dcent.png"
            },
            "banner_link": {
                "ko": "https://store-kr.dcentwallet.com",
                "en": "https://store.dcentwallet.com"
            },
            "banner_desc": {
                "ko": "디센트 지문인증형 지갑으로 한층 더 강화된 보안을 경험하세요!",
                "en": "Enhance your security with D'CENT biometric wallet"
            },
            "banner_btn_text": {
                "ko": "구매하기",
                "en": "Buy Now"
            }
        },
         {
            "banner_name" : {
                "ko" : "디센트 블로그",
                "en" : "D'CENT Blog"
            },
            "banner_url": {
                "ko": f"{settings.IMAGE_BASE_URL}banner_blog.png",
                "en": f"{settings.IMAGE_BASE_URL}banner_blog.png"
            },
            "banner_link": {
                "ko": "https://store-kr.dcentwallet.com/blogs/post",
                "en": "https://store.dcentwallet.com/blogs/post"
            },
            "banner_desc": {
                "ko": "새로운 디센트 블로그를 방문하여 최신 업데이트를 먼저 확인해보세요!",
                "en": "Visit the new D’CENT Blog to explore the latest updates first!"
            },
            "banner_btn_text": {
                "ko": "확인하기",
                "en": "Explore"
            }
        }
    ]
    
    return ApiResponseWrapper.success(
        data=banner_data,
        code=1000
    )


@api_view(['GET'])
def dapp_list(request):
    """
    DApp 목록 요청 API
    """
    # DApp 데이터
    dapp_data = [
        {
            "name": "MoonPay",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_moonpay.png",
            "service_url": "https://buy.moonpay.com",
            "description": {
                "en": "MoonPay offers simple and safer way to buy crypto instantly using VISA/Mastercard payment"
            },
            "condition": ["en", "ios"]  # 영어를 사용하는 아이폰 사용자에게만 노출
        },
        {
            "name": "FTSO Portal",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_ftso.png",
            "service_url": "https://ftsoportal.com/",
            "description": {
                "ko": "FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다. 사용자는 Vote Power 위임을 통해 패시브인컴(passive income)을 보상으로 받을 수 있습니다.",
                "en": "FTSO Portal is a service by D'CENT to provide fast and easy way to delegate Vote Power to the user's favorite FTSO provider. By delegating Vote Power, users can earn passive income as reward."
            },
            "networks": ["Songbird", "Flare"],
            "condition": []
        },
        {
            "name": "Astar Portal",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_astar.png",
            "service_url": "https://portal.astar.network/",
            "description": {
                "ko": "아스타포탈은 Astar Network에서 제공하는 모든 것을 사용하기 위한 Astar Network의 공식 애플리케이션입니다.",
                "en": "Astar Portal is the official Astar Network application for using everything that Astar Network offers."
            },
            "networks": ["Astar"],
            "condition": ["ko", "en", "dev", "stage"]  # dev/stage 환경에서만 노출
        },
        {
            "name": "1inch",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_1inch.png",
            "service_url": "https://app.1inch.io/",
            "description": {
                "ko": "1inch는 모든 주요 DEX 거래소의 유동성과 가격 정보를 하나의 플랫폼에서 제공합니다. 원하는 거래의 가격을 쉽게 조회하여 토큰을 교환할 수 있습니다.",
                "en": "1inch is a decentralized exchange (DEX) aggregator. It's designed to roll liquidity and pricing from all major DEXes into one platform, making it easy to get the best price for the desired trade."
            },
            "networks": ["Ethereum"],
            "condition": []
        },
        {
            "name": "XDSea",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_xdsea.png",
            "service_url": "",  # URL이 제공되지 않음
            "description": {
                "ko": "XDSea는 XDC 네트워크에 구축된 NFT를 사고 파는 세계 최초이자 최대 규모의 P2P 분산형 시장입니다.",
                "en": "XDSea is the world's first and largest peer-to-peer decentralized marketplace for buying and selling NFTs built on the XDC Network."
            },
            "networks": ["XDC Network"],
            "condition": []
        },
        {
            "name": "Compound",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_compound.png",
            "service_url": "https://app.compound.finance/",
            "description": {
                "ko": "Compound는 담보를 통해 이자를 얻거나 자산을 빌릴 수 있는 이더리움 기반의 머니 마켓 프로토콜입니다. 컴파운드의 유동성 풀에 자산을 공급하면 복리이자를 얻을 수 있습니다.",
                "en": "Compound is Ethereum's algorithmic money market protocol that allows users to earn interest or borrow assets through collateral. Anyone can supply assets to Compound's liquidity pool and earn continuous compound interest immediately."
            },
            "networks": ["Ethereum"],
            "condition": []
        },
        {
            "name": "PoolTogether",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_pooltogether.png",
            "service_url": "https://app.pooltogether.com/",
            "description": {
                "ko": "PoolTogether는 저축을 재미있게 하는 이더리움 기반의 서비스입니다. 자산을 예치하면 \"저축 티켓\"을 받아 '풀'에 참여합니다. 각 저축 티켓은 풀에서 발생한 이자를 받을 수있는 기회를 제공하지만, 당첨되지 않더라도 손실이 없습니다.",
                "en": "PoolTogether is an Ethereum based application that makes saving money as fun as a game. You join a pool by getting a \"savings ticket\". Each Savings Ticket gives you a chance to win a prize, but even if you don't win, you keep all your money!"
            },
            "networks": ["Ethereum"],
            "condition": []
        },
        {
            "name": "OpenSea",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_opensea.png",
            "service_url": "https://opensea.io/",
            "description": {
                "ko": "OpenSea는 수집품, 게임 아이템, 디지털 아트와 같은 이더리움 기반의 디지털 상품 및 디지털 자산을 거래할 수 있는 마켓 플레이스입니다.",
                "en": "OpenSea is a marketplace for digital goods, including collectibles, game items, digital art, and other digital assets backed by blockchain such as Ethereum."
            },
            "networks": ["Ethereum", "Polygon"],
            "condition": []
        },
        {
            "name": "BlueWhale",
            "image_url": f"{settings.IMAGE_BASE_URL}icon_bluewhale.png",
            "service_url": "https://bwpm.io/",
            "description": {
                "ko": "블루웨일 프로토콜은 사용하기 쉬운 디파이 서비스를 지향하는 프로젝트입니다. 디파이 대시보드, DEX 어그리게이터, 자동 재예치 서비스 등 탈중앙화 금융(DeFi) 관련 서비스 제공을 통해 클레이튼 디파이 생태계 활동을 더 쉽고 효율적으로 만듭니다."
            },
            "networks": ["Kaia"],
            "condition": ["ko"]  # 한국어 사용자들에게만 노출
        }
    ]
    
    return ApiResponseWrapper.success(
        data=dapp_data,
        code=1000
    )


@api_view(['GET'])
def favorite_list(request):
    """
    즐겨찾기 목록 요청 API
    """
    # 샘플 즐겨찾기 데이터
    favorite_data = [
        {
            "image_url": "https://example.com/favorite1-logo.png",
            "service_url": "https://favorite1.example.com",
            "language": {
                "ko": "즐겨찾기 서비스 1",
                "en": "Favorite Service 1"
            },
            "networks": ["ethereum", "polygon"],
            "condition": {
                "visible_language": ["ko", "en"],
                "visible_env": ["dev", "stage", "prod"]
            }
        },
        {
            "image_url": "https://example.com/favorite2-logo.png",
            "service_url": "https://favorite2.example.com",
            "language": {
                "ko": "즐겨찾기 서비스 2",
                "en": "Favorite Service 2"
            },
            "networks": ["bsc", "avalanche"],
            "condition": {
                "visible_language": ["en"],
                "visible_env": ["dev", "stage"]
            }
        }
    ]
    
    return ApiResponseWrapper.success(
        data=favorite_data,
        code=1000
    )
