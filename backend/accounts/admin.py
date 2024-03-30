from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser, FollowExpiration, FollowActivity


class AppUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'username', 'is_active', 'is_staff', 'is_sharer')
    search_fields = ('email', 'username')
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_sharer', 'follows_tier1', 'follows_tier2', 'follows_tier3')}),  # Include tier lists here
        ('Profile Picture', {'fields': ('profile_picture',)}), 
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_sharer', 'profile_picture', 'follows_tier1', 'follows_tier2', 'follows_tier3')},  # Include tier lists here
        ),
    )

    list_filter = ('is_active', 'is_staff', 'is_sharer')

admin.site.register(AppUser, AppUserAdmin)

admin.site.register(FollowExpiration)
admin.site.register(FollowActivity)