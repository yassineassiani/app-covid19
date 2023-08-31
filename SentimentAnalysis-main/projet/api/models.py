from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    DateDeNaissance = models.DateField()
    Sexe = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'DateDeNaissance']

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return self.email


class ExpertAccountManager(BaseUserManager):
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user


class Expert(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    DateDeNaissance = models.DateField()
    Sexe = models.CharField(max_length=255)
    specialite = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    objects = ExpertAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'DateDeNaissance', 'specialite']

    def get_full_name(self):
        return self.first_name + " " + self.last_name


class Article (models.Model):
    proprietaire = models.ForeignKey(Expert, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default='')
    description = models.TextField()
    im = models.FileField(null=True, blank=True, upload_to='public')
    b = models.BooleanField(default=False)


class Post (models.Model):
    proprietaire = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    description = models.TextField()
    im = models.FileField(null=True, blank=True, upload_to='public')
    vd = models.FileField(null=True, blank=True, upload_to='public')
    bv = models.BooleanField(default=False)


class PostVerifie (models.Model):
    proprietaire = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    description = models.TextField()
    im = models.FileField(null=True, blank=True, upload_to='public')
    vd = models.FileField(null=True, blank=True, upload_to='public')
    bc = models.BooleanField(default=False)
    sentiment = models.IntegerField(default=0)


class PostSupp (models.Model):
    proprietaire = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    description = models.TextField()
    im = models.FileField(null=True, blank=True, upload_to='public')
    vd = models.FileField(null=True, blank=True, upload_to='public')


class Comment (models.Model):
    idPost = models.ForeignKey(PostVerifie, on_delete=models.CASCADE)
    idUser = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    description = models.TextField()
    sentiment = models.IntegerField(default=0, blank=True)


class ExpertComment (models.Model):
    idPost = models.ForeignKey(PostVerifie, on_delete=models.CASCADE)
    idExpert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    description = models.TextField()
    sentiment = models.IntegerField(default=0, blank=True)
