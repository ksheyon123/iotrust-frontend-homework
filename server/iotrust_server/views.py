from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.conf import settings
import os
import mimetypes

def serve_react_app(request):
    """
    React 앱의 정적 파일과 SPA 라우팅을 처리하는 뷰
    """
    try:
        # 요청된 경로 가져오기
        path = request.path.lstrip('/')
        
        # Docker 환경과 로컬 환경 모두 지원
        docker_dist_dir = settings.BASE_DIR / "client_dist"
        local_dist_dir = settings.BASE_DIR.parent / "client" / "dist"
        
        # 사용할 디렉토리 결정
        if os.path.exists(docker_dist_dir):
            dist_dir = docker_dist_dir
        elif os.path.exists(local_dist_dir):
            dist_dir = local_dist_dir
        else:
            return HttpResponse(
                "<h1>클라이언트 빌드 파일을 찾을 수 없습니다.</h1>"
                "<p>Docker 환경: <code>docker-compose up</code></p>"
                "<p>로컬 환경: <code>cd client && npm run build</code></p>",
                content_type='text/html',
                status=404
            )
        
        # 빈 경로이거나 루트 경로인 경우 index.html 서빙
        if not path or path == '/':
            file_path = dist_dir / "index.html"
        else:
            # 정적 파일 경로 확인
            file_path = dist_dir / path
        
        # 파일이 존재하고 디렉토리가 아닌 경우 해당 파일 서빙
        if os.path.exists(file_path) and os.path.isfile(file_path):
            # MIME 타입 결정
            content_type, _ = mimetypes.guess_type(str(file_path))
            if not content_type:
                content_type = 'application/octet-stream'
            
            # 텍스트 기반 파일들은 UTF-8로 읽기
            if content_type.startswith('text/') or content_type in ['application/javascript', 'application/json']:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                return HttpResponse(content, content_type=content_type)
            else:
                # 바이너리 파일들은 바이너리 모드로 읽기
                with open(file_path, 'rb') as f:
                    content = f.read()
                return HttpResponse(content, content_type=content_type)
        else:
            # 파일이 존재하지 않으면 index.html로 폴백 (SPA 라우팅 지원)
            index_path = dist_dir / "index.html"
            if os.path.exists(index_path):
                with open(index_path, 'r', encoding='utf-8') as f:
                    return HttpResponse(f.read(), content_type='text/html')
            else:
                raise Http404("React build files not found.")
            
    except Exception as e:
        return HttpResponse(
            f"<h1>오류가 발생했습니다</h1><p>{str(e)}</p>",
            content_type='text/html',
            status=500
        )
