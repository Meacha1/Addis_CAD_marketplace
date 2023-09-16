from django.urls import path
from .views import *

urlpatterns = [
    path('FileList/', FileListView.as_view(), name='file_list'),
    path('FileDetail/<str:pk>/', FileDetailView.as_view(), name='file_detail'),
    path('UploadFile/<str:id>/', FileUploadView.as_view(), name='file_upload'),
    path('UserFileList/<str:ownerId>/', UserFileListView.as_view(), name='user_file_list'),
    path('GetSMS/', handle_sms, name='handle_sms'),
    path('Review/', ReviewListView.as_view(), name='review_list'),
    path('Review/<str:pk>/', ReviewDetailView.as_view(), name='review_detail'),
    path('GetReview/<str:fileId>/', ReviewGetView.as_view(), name='get_review'),
    path('attached-files/<str:parent_file_id>/', AttachedFileListView.as_view(), name='attached-file-list'),
    path('check-transaction/<str:transaction_number>/', check_transaction_number, name='check_transaction_number'),
]