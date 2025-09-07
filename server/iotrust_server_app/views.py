from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def health_check(request):
    """
    서버 상태 확인용 API
    """
    return Response({
        'status': 'success',
        'message': 'IoTrust Server is running!',
        'version': '1.0.0'
    }, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def api_test(request):
    """
    테스트용 API 엔드포인트
    """
    if request.method == 'GET':
        return Response({
            'method': 'GET',
            'message': 'IoTrust Server API Test - GET 요청 성공',
            'data': {
                'server': 'iotrust-server',
                'framework': 'Django REST Framework'
            }
        })
    
    elif request.method == 'POST':
        return Response({
            'method': 'POST',
            'message': 'IoTrust Server API Test - POST 요청 성공',
            'received_data': request.data
        })
