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
    # 샘플 DApp 데이터
    dapp_data = [
        {
            "name": "MoonPay",
            "image_url": "https://example.com/defi-exchange-logo.png",
            "service_url": "https://defi-exchange.example.com",
            "description": {
                "ko": "탈중앙화 거래소로 안전하고 빠른 토큰 교환을 제공합니다",
                "en": "Decentralized exchange providing safe and fast token swaps"
            },
            "networks": ["ethereum", "polygon", "bsc"],
            "condition": ["ko", "en", "dev", "stage", "prod"]
        },
        {
            "name": "NFT Marketplace",
            "image_url": "https://example.com/nft-marketplace-logo.png",
            "service_url": "https://nft-marketplace.example.com",
            "description": {
                "ko": "고유한 디지털 자산을 거래할 수 있는 NFT 마켓플레이스",
                "en": "NFT marketplace for trading unique digital assets"
            },
            "networks": ["ethereum", "polygon"],
            "condition": ["ko", "en", "stage", "prod"]
        },
        {
            "name": "Yield Farming",
            "image_url": "https://example.com/yield-farming-logo.png",
            "service_url": "https://yield-farming.example.com",
            "description": {
                "ko": "유동성 제공으로 수익을 창출하는 이자 농사 플랫폼",
                "en": "Yield farming platform for earning rewards through liquidity provision"
            },
            "networks": ["ethereum", "bsc", "avalanche"],
            "condition": ["ko", "en", "prod"]
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
