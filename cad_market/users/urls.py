from django.urls import path
from .views import UserRegisterView, UserLoginView, FindUserView, FindUserByEmailView, FindUserByIDView, UserLogoutView, UploadAvatarView

urlpatterns = [

    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('find/', FindUserView.as_view(), name='user-find'),
    path('find/<str:email>/', FindUserByEmailView.as_view(), name='user-find-by-email'),
    path('findByid/<str:id>/', FindUserByIDView.as_view(), name='user-find-by-id'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('uploadAvatar/<str:id>/', UploadAvatarView.as_view(), name='upload-avatar'),

]