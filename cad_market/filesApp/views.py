from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from .models import File, Purchase, Review, AttachedFile
from users.models import UserCreate
from .serializers import FileSerializer, PurchaseSerializer, ReviewSerializer, AttachedFileSerializer
from django.http import Http404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view
from rest_framework import status
import re, json
from django.db.models import Avg
from decimal import Decimal
from datetime import datetime, timedelta
from django.db.models import Q


class FileListView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

class UserFileListView(generics.ListAPIView):
    serializer_class = FileSerializer

    def get_queryset(self):
        ownerId = self.kwargs['ownerId']
        
        try:
            return File.objects.filter(owner=ownerId)
        except (ValueError, File.DoesNotExist):
            raise Http404("Invalid ownerId or owner does not exist")

class FileUploadView(generics.CreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser,)

    def perform_create(self, serializer):
        parent_file = serializer.save()

        uploaded_files = self.request.FILES.getlist('attached_files')
        if not uploaded_files:
            print('No files attached')
            return Response({"message": "No files attached"}, status=status.HTTP_400_BAD_REQUEST)

        for uploaded_file in uploaded_files:
            attached_file = AttachedFile(parent_file=parent_file, attached_file=uploaded_file)
            attached_file.save()

        return Response({"message": "Files uploaded successfully"}, status=status.HTTP_201_CREATED)

class FileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Handle attached_files
        attached_files = request.FILES.getlist('attached_files')

        # Clear previously attached files
        AttachedFile.objects.filter(parent_file=instance).delete()

        # Create and save new AttachedFile instances for the uploaded files
        for file in attached_files:
            attached_file = AttachedFile(attached_file=file, parent_file=instance)
            attached_file.save()

        # Update other fields (title, description, category, price)
        instance.title = request.data.get('title')
        instance.description = request.data.get('description')
        instance.category = request.data.get('category')
        instance.price = request.data.get('price')

        # Save the updated instance
        instance.save()

        # Return the updated data
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([])
def handle_sms(request):
    try:
        # Parse the SMS data from the JSON request body
        sms_data = request.data
        print(sms_data)

        content = sms_data.get('content', '')

        # Extract data from content using regular expressions
        amount_match = re.search(r'ETB\s+([\d,.]+)', content)
        date_match = re.search(r'on\s+(\d{2}/\d{2}/\d{4}\s+\d{2}:\d{2}:\d{2})', content)
        transaction_number_match = re.search(r'transaction number is\n([A-Z\d]+)', content)
        buyer_phone_match = re.search(r'(251\d{9})', content)
        print(amount_match)
        print(date_match)
        print(transaction_number_match)
        print(buyer_phone_match)

        if not (amount_match and date_match and transaction_number_match and buyer_phone_match):
            print('Failed to extract SMS information')
            return Response('Invalid SMS format', status=status.HTTP_400_BAD_REQUEST)

        transaction_amount = Decimal(amount_match.group(1).replace(',', ''))
        transaction_date_str = date_match.group(1)
        transaction_date = datetime.strptime(transaction_date_str, '%d/%m/%Y %H:%M:%S')
        transaction_number = transaction_number_match.group(1)
        buyer_phone = '+' + buyer_phone_match.group(1)  # Add "+" before the phone number
        message = content  # Use the entire content as the message

        # Create a data dictionary for the serializer
        serializer_data = {
            'buyer_phone': buyer_phone,
            'message': message[:255],  # Truncate the message if it's too long
            'transaction_amount': transaction_amount,
            'transaction_date': transaction_date,
            'transaction_number': transaction_number,
        }

        # Create a Purchase object using the serializer
        serializer = PurchaseSerializer(data=serializer_data)

        if serializer.is_valid():
            serializer.save()  # Save the Purchase object
            print('SMS stored successfully')
            return Response('SMS received and stored successfully', status=status.HTTP_200_OK)
        else:
            print('Failed to store SMS:', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        # Log the exception for debugging
        print(f"Exception: {str(e)}")
        return Response('Error processing SMS', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@authentication_classes([SessionAuthentication])
@permission_classes([])
def check_transaction_number(request,request_type, transaction_number, price, buyer_id, file_id):
    try:
        # Check if the transaction_number exists in the database
        exists = Purchase.objects.filter(transaction_number=transaction_number).exists()
        if exists == False:
            print(f'Transaction number does not exist in the database.')
            return Response({'message': 'The transaction number does not exist in the database.'}, status=status.HTTP_400_BAD_REQUEST)
        purchase = Purchase.objects.get(transaction_number=transaction_number)
        is_transaction_Number_valid = purchase.buyer_id == '' or purchase.file_id == None
        if exists:
            if is_transaction_Number_valid and request_type == 'buy':
                print(f'Transaction number {transaction_number} exists in the database.')
                print(f'Buyer id is {buyer_id}')
                print(f'File id is {file_id}')
                # convert the price to Decimal
                price = Decimal(price)
                if purchase.transaction_amount >= price:
                    # Update the purchase object
                    purchase.buyer_id = buyer_id
                    purchase.file_id = file_id
                    sold_file = File.objects.get(id=file_id)
                    owner = UserCreate.objects.get(id=sold_file.owner_id)
                    owner.sale_count += 1
                    sold_file.num_of_sales += 1
                    owner.sale_amount += price
                    purchase.save()
                    sold_file.save()
                    owner.save()
                    print('You have completed a successful purchase.')
                    return Response({'message': 'You have completed a successful purchase.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'The money you transfered is less than the price.'}, status=status.HTTP_400_BAD_REQUEST)
            elif is_transaction_Number_valid and request_type == 'vipSubscription':
                # convert the price to Decimal
                price = Decimal(price)
                if purchase.transaction_amount >= price: # if the money transfered is greater than or equal to the minimum subscription price
                    owner = UserCreate.objects.get(id=buyer_id)
                    owner.is_vip = True
                    purchase.buyer_id = buyer_id
                    purchase.file_id = file_id
                    owner.vip_subscription_date = purchase.transaction_date
                    if price >= 5 and price < 10:
                        owner.vip_subscription_expiration_date = datetime.now() + timedelta(days=30)
                    elif price >= 10 and price < 20:
                        owner.vip_subscription_expiration_date = datetime.now() + timedelta(days=60)
                    elif price >= 20:
                        owner.vip_subscription_expiration_date = datetime.now() + timedelta(days=90)
                    owner.save()
                    purchase.save()
                    print('You have completed a successful purchase.')
                    return Response({'message': 'You have completed a successful purchase.'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'The money you transfered is less than the price.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'The transaction number has already been used.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            print(f'Check your transaction number and try again')
            return Response({'message': f'Transaction number {transaction_number} does not exist in the database.'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Log the exception for debugging
        print(f"Exception: {str(e)}")
        return Response('Error checking transaction number', status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ReviewListView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewGetView(generics.ListAPIView):
    def get(self, request, fileId):
        print("Received id:", fileId)
        
        try:
            # Attempt to get all reviews for the specified fileId
            reviews = Review.objects.filter(fileId=fileId)
            
            # If no reviews are found, return an appropriate response
            if not reviews.exists():
                average_rating = 0
                return Response({"reviews": [], "average_rating": average_rating})

            # Calculate the average rating
            average_rating = reviews.aggregate(Avg('rating'))['rating__avg']
            
            # Update the file's average_rating field in the database
            file = File.objects.get(id=fileId)
            file.average_rating = average_rating
            file.save()

            # Serialize the reviews and return them
            serializer = ReviewSerializer(reviews, many=True)
            return Response({"reviews": serializer.data, "average_rating": average_rating})
        except File.DoesNotExist:
            # If the file doesn't exist, return a 404 response
            return Response({"detail": "File not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Handle other exceptions as needed
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AttachedFileListView(generics.ListAPIView):
    serializer_class = AttachedFileSerializer

    def get_queryset(self):
        # Assuming you pass the parent file's ID in the URL as a parameter
        parent_file_id = self.kwargs['parent_file_id']
        return AttachedFile.objects.filter(parent_file__id=parent_file_id)


class FileSearchView(generics.ListAPIView):
    serializer_class = FileSerializer

    def get_queryset(self):
        search_query = self.request.query_params.get('search_query', '')
        category = self.request.query_params.get('category', '')

        # Build a query using the Q object to search in both title and description
        queryset = File.objects.filter(
            Q(title__icontains=search_query) | Q(description__icontains=search_query)
        )

        # Filter by category if it's provided
        if category:
            queryset = queryset.filter(category__icontains=category)

        return queryset

# class PurchaseListView(generics.ListCreateAPIView):
#     queryset = Purchase.objects.all()
#     serializer_class = PurchaseSerializer
    
# class PurchaseDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Purchase.objects.all()
#     serializer_class = PurchaseSerializer