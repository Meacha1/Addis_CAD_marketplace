from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class UserManager(BaseUserManager):
    def create_user(self, username, email, password, phone_number, user_type):
        if not username:
            raise ValueError("Users must have a username")
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")
        if not phone_number:
            raise ValueError("Users must have a phone number")

        email = self.normalize_email(email)

        user = self.model(
            username=username,
            email=email,
            phone_number=phone_number,
            user_type=user_type  # New field
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, phone_number):
        user = self.create_user(
            username=username,
            email=email,
            password=password,
            phone_number=phone_number,
            user_type='admin'  # Set user_type for superuser
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class UserCreate(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    user_type = models.CharField(
        max_length=20,
        choices=[
            ('user', 'User'),
            ('professional', 'Professional'),
            ('admin', 'Admin'),
        ],
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_vip = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password', 'phone_number', 'user_type']

    objects = UserManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    def get_short_name(self):
        return self.username
    
    def get_full_name(self):
        return self.username
