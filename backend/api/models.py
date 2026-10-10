from django.db import models
from django.core.validators import FileExtensionValidator

class Profile(models.Model):
  
    name = models.CharField(max_length=100, default="Tasfin Rafi")
    title = models.CharField(max_length=150, help_text="e.g., FULL STACK ENGINEER_")
    bio = models.TextField(help_text="99 bugs in the code, take one down, 127 bugs in the code.")
    

    avatar = models.ImageField(upload_to='profile/avatars/', blank=True, null=True, help_text="profile picture")
    resume = models.FileField(
        upload_to='profile/resumes/', 
        blank=True, 
        null=True, 
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])],
        help_text="upload resume in pdf format"
    )
    
    
    email = models.EmailField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        
        if not self.pk and Profile.objects.exists():
            raise ValueError("A Profile instance already exists. Please edit the existing one.")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Profile: {self.name}"


class Technology(models.Model):
    CATEGORY_CHOICES = (
        ('Language', 'Language'),
        ('Framework', 'Framework / Library'),
        ('Database', 'Database'),
        ('Tool', 'Tool / DevOps'),
    )

    name = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Framework')
    icon = models.ImageField(upload_to='tech_icons/', blank=True, null=True, help_text="Optional tech logo icon")

    class Meta:
        verbose_name_plural = "Technologies"
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} ({self.category})"


class Experience(models.Model):
    ROLE_TYPE_CHOICES = (
        ('Work', 'Work / Internship'),
        ('Education', 'Education / Degree'),
    )

    role = models.CharField(max_length=100, help_text="e.g., Software Engineer Intern")
    company = models.CharField(max_length=100, help_text="e.g., Socif or Techlution")
    company_url = models.URLField(blank=True, null=True, help_text="Link to company website")
    location = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., Hong Kong / Remote")
    
    description = models.TextField(help_text="talk about your responsibilites for the project or the company")
    
    start_date = models.CharField(max_length=50, help_text="e.g., Jun 2025")
    end_date = models.CharField(max_length=50, help_text="e.g., Present or Dec 2025")
    
    type = models.CharField(max_length=20, choices=ROLE_TYPE_CHOICES, default='Work')
    technologies = models.ManyToManyField(Technology, related_name='experiences', blank=True)
    
    order = models.IntegerField(default=0, help_text="Display order sequence (lower numbers appear first)")

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.role} at {self.company}"


class Project(models.Model):
    
    title = models.CharField(max_length=100, help_text="e.g., Replay - Timeline and Activities")
    slug = models.SlugField(unique=True, help_text="URL-friendly identifier (auto-generated or manual)")
    description = models.TextField(help_text="Detailed project summary.")
    
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Screenshot or preview graphic")
    
    project_url = models.URLField(blank=True, null=True, help_text="Live demo or app store link")
    github_url = models.URLField(blank=True, null=True, help_text="GitHub repository link")
    
    technologies = models.ManyToManyField(Technology, related_name='projects', blank=True)
    
    featured = models.BooleanField(default=False, help_text="Check if this project should be highlighted.")
    order = models.IntegerField(default=0, help_text="Display order sequence")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
    
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} ({self.email})"