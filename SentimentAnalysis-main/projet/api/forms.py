from django import forms
from .models import UserAccount


class SignupForm(forms.ModelForm):
    first_name = forms.CharField(widget=forms.TextInput())
    last_name = forms.CharField(widget=forms.TextInput())
    email = forms.CharField(widget=forms.EmailInput(),
                            max_length=100, required=True,)
    DateDeNaissance = forms.DateInput()
    Sexe = forms.CharField(widget=forms.TextInput())
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email',
                  'DateDeNaissance', 'password', 'Sexe')
