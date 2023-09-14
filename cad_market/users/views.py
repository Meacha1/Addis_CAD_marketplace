from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import logout

from .models import UserCreate
from .serializers import UserCreateSerializer
import jwt
from django.conf import settings
from datetime import datetime, timedelta



class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 
            return Response(UserCreateSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = UserCreate.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        # issue access + refresh tokens
        payload = {
            'id': str(user.id),  # Convert the UUID object to a string
            'exp': datetime.utcnow() + timedelta(days=1)  # Token expiration time
            }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        
        response = Response()
        response.data = {
            'message': 'Login successful!',
            'user': UserCreateSerializer(user).data,
            'token': token
        }
        return response  

class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response("Logged out successfully")



class FindUserView(APIView):
    def post(self, request):
        email = request.data.get('email')
        
        try:
            user = UserCreate.objects.get(email=email)  # Use objects.get to retrieve a single object by email
            serializer = UserCreateSerializer(user)  # Create a serializer instance
            return Response(serializer.data)  # Return serialized user data
        except UserCreate.DoesNotExist:
            return Response(False)
    
class FindUserByEmailView(APIView):

  def get(self, request, email):
    
    try:
      user = UserCreate.objects.get(email=email)  
      return Response(UserCreateSerializer(user).data)
    except UserCreate.DoesNotExist:
      return Response(False)


class FindUserByIDView(APIView):
  def get(self, request, id):
      print("Received id:", id)
      
      try:
        user = UserCreate.objects.get(id=id)  
        return Response(UserCreateSerializer(user).data)
      except UserCreate.DoesNotExist:
        return Response(False)

class UploadAvatarView(APIView):
   def put(self, request, id):
       print("Received id:", id)
       
       try:
           user = UserCreate.objects.get(id=id)
           user.avatar = request.data.get('avatar')
           user.save()
           return Response(UserCreateSerializer(user).data)
       except UserCreate.DoesNotExist:
           return Response(False)