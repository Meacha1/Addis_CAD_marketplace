from rest_framework import serializers
from .models import File, Purchase, Review, AttachedFile

class AttachedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttachedFile
        fields = '__all__'

class FileSerializer(serializers.ModelSerializer):
    attached_files = AttachedFileSerializer(many=True, read_only=True)

    class Meta:
        model = File
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
