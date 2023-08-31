from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Article, Comment, Expert, ExpertComment, Post, PostSupp, PostVerifie, UserAccount

admin.site.index_title = "Administration"
admin.site.site_header = "Administration"
admin.site.site_title = "Expert"

admin.site.register(UserAccount)
admin.site.register(Expert)
admin.site.register(Post)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(ExpertComment)
admin.site.register(PostVerifie)
admin.site.register(PostSupp)
