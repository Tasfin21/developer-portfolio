from rest_framework import serializers
from .models import Profile, Technology, Experience, Project, ContactMessage

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name', 'category', 'icon']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    
    technologies = TechnologySerializer(many=True, read_only=True)
    
    
    technology_ids = serializers.PrimaryKeyRelatedField(
        queryset=Technology.objects.all(), 
        source='technologies', 
        many=True, 
        write_only=True, 
        required=False
    )

    class Meta:
        model = Experience
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    technologies = TechnologySerializer(many=True, read_only=True)
    technology_ids = serializers.PrimaryKeyRelatedField(
        queryset=Technology.objects.all(), 
        source='technologies', 
        many=True, 
        write_only=True, 
        required=False
    )

    class Meta:
        model = Project
        fields = '__all__'


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at', 'is_read']