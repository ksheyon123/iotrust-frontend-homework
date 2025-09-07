from rest_framework.response import Response
from rest_framework import status


class ApiResponseWrapper:
    """
    클라이언트의 ApiResponse 인터페이스에 맞는 응답 형식을 제공하는 래퍼 클래스
    status: HTTP 상태 코드 (200, 400, 404, 500 등)
    code: 애플리케이션 레벨의 세분화된 코드 (비즈니스 로직용)
    """
    
    @staticmethod
    def success(data=None, status_code=status.HTTP_200_OK, code=1000, count=None, next_page=None, previous=None):
        """성공 응답을 생성합니다."""
        response_data = {
            'status': status_code,
            'code': code
        }
        
        if data is not None:
            response_data['data'] = data
        
        if count is not None:
            response_data['count'] = count
            
        if next_page is not None:
            response_data['next'] = next_page
            
        if previous is not None:
            response_data['previous'] = previous
        
        return Response(response_data, status=status_code)
    
    @staticmethod
    def error(message, status_code=status.HTTP_400_BAD_REQUEST, code=4000, data=None):
        """에러 응답을 생성합니다."""
        response_data = {
            'status': status_code,
            'code': code,
            'error': message
        }
        
        if data is not None:
            response_data['data'] = data
            
        return Response(response_data, status=status_code)
    
    @staticmethod
    def paginated_success(paginated_data, serializer_data, pagination_instance, status_code=status.HTTP_200_OK, code=1000):
        """페이지네이션된 성공 응답을 생성합니다."""
        # paginated_data는 paginate_queryset()의 반환값 (리스트)
        # pagination_instance는 self (ViewSet 인스턴스)
        
        if hasattr(pagination_instance, 'page') and pagination_instance.page:
            page = pagination_instance.page
            return ApiResponseWrapper.success(
                data=serializer_data,
                count=page.paginator.count,
                next=page.next_page_number() if page.has_next() else None,
                previous=page.previous_page_number() if page.has_previous() else None,
                status_code=status_code,
                code=code
            )
        else:
            # 페이지네이션이 없는 경우
            return ApiResponseWrapper.success(data=serializer_data, status_code=status_code, code=code)
    
    @staticmethod
    def list_success(data, code=1000):
        """리스트 성공 응답을 생성합니다."""
        return ApiResponseWrapper.success(data=data, code=code)
    
    @staticmethod
    def created(data=None, code=1001):
        """생성 성공 응답을 생성합니다."""
        return ApiResponseWrapper.success(data=data, status_code=status.HTTP_201_CREATED, code=code)
    
    @staticmethod
    def no_content(code=1002):
        """내용 없음 응답을 생성합니다."""
        return Response({
            'status': status.HTTP_204_NO_CONTENT,
            'code': code
        }, status=status.HTTP_204_NO_CONTENT)
