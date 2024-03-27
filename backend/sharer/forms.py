from django import forms
from .models import SharerUpload

class SharerUploadForm(forms.ModelForm):
    class Meta:
        model = SharerUpload
        fields = ['title', 'description', 'visibility']

    VISIBILITY_CHOICES = [
        ('ALL', 'All (followers and non-followers)'),
        ('NON_FOLLOWER', 'Preview Content'),
        ('FOLLOWERS_TIER1', 'BRONZE - Tier'),
        ('FOLLOWERS_TIER2', 'SILVER - Tier'),
        ('FOLLOWERS_TIER3', 'GOLD - Tier'),
    ]

    visibility = forms.MultipleChoiceField(
        label='Visibility',
        widget=forms.CheckboxSelectMultiple,
        choices=VISIBILITY_CHOICES,
        required=False  # Set to False if the field is not mandatory
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # If the instance has initial visibility values, set them here
        if self.instance:
            self.fields['visibility'].initial = self.instance.visibility.split(',')