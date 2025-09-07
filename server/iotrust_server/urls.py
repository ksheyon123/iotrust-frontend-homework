"""
URL configuration for iotrust_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    # API 엔드포인트 (가장 먼저 매칭되도록)
    path('api/v1/', include('iotrust_server_app.urls')),
    
    # 루트 경로에서 React 앱 서빙
    path("", views.serve_react_app, name="react_app"),
    
    # SPA 라우팅을 위한 catch-all 패턴
    # API가 아닌 모든 경로를 React 앱으로 라우팅
    re_path(r'^(?!api/)(?!admin/).*$', views.serve_react_app, name="react_app_catchall"),
]

# 개발 환경에서 정적 파일 서빙
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
