from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.urls import include, re_path
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('filesApp.urls')),
    path('users/', include('users.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)