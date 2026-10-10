from django.contrib import admin
from .models import (
    Profile,
    Technology,
    Experience,
    Project,
    ContactMessage,
)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'title',
        'email',
        'updated_at',
    )
    
@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
    )
    
    list_filter = (
        'category',
    )
    
    search_fields = (
        'name',
    )
    
    
@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = (
        'role',
        'company',
        'type',
        'start_date',
        'end_date',
        'order',
    )
    
    list_filter = (
        'type',
    )
    
    search_fields = (
        'role',
        'company',
    )
    
    filter_horizontal = (
        'technologies',
    )
    
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'featured',
        'order',
        'created_at'
    )
    
    list_filter = (
        'featured',
        'technologies',
    )
    
    search_fields = (
        'title',
        'descriptions',
    )
    
    prepopulated_fields = {
        'slug' : ('title',),
    }
    
    filter_horizontal = (
        'technologies',
    )
    
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'email',
        'subject',
        'is_read',
        'created_at',
    )
    
    list_filter = (
        'is_read',
        'created_at',
    )
    
    search_fields = (
        'name',
        'email',
        'subject',
        'message',
    )
    
    readonly_fields = (
        'created_at',
    )