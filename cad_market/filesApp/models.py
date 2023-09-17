from django.db import models
from users.models import UserCreate
import uuid


class File(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(UserCreate, on_delete=models.CASCADE, null=True, default=1)
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_premium = models.BooleanField(default=False)
    category = models.CharField(max_length=255, default='CAD')
    file = models.FileField(upload_to='files/', blank=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True)
    average_rating = models.PositiveIntegerField(default=0)
    num_of_sales = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class AttachedFile(models.Model):
    parent_file = models.ForeignKey(File, on_delete=models.CASCADE, related_name='attached_files', default=None)
    attached_file = models.FileField(upload_to='attached_files/')

    def __str__(self):
        return self.attached_file.name

class Purchase(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  buyer_id = models.CharField(max_length=255 , default='', null=True)
  buyer_phone = models.CharField(max_length=255 , default='')
  file_id = models.CharField(max_length=255 , default='', null=True)
  message = models.CharField(max_length=255 , default='')
  transaction_amount = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
  transaction_number = models.CharField(max_length=255, default='')
  transaction_date = models.DateTimeField(auto_now_add=False, default=None)


class Review(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  fileId = models.ForeignKey(File, on_delete=models.CASCADE, related_name='reviews')
  user = models.ForeignKey(UserCreate, on_delete=models.CASCADE)
  rating = models.PositiveIntegerField()
  comment = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  