from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets


from .serializers import ArticleSerializer, CommentSerializer, ExpertCommentSerializer
from .serializers import ExpertSerializer, PostSerializer, PostSuppSerializer, PostVerifieSerializer, UserAccountSerializer
from .forms import SignupForm

from .models import Comment, ExpertComment, PostSupp, PostVerifie, UserAccount, Article
from .models import Post, Expert


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/signup',
        '/api/login',
        '/api/posts',
        '/api/articles',
        '/api/Comments',
        '/api/ExpertComments',
        '/api/PostVerifie',
        '/api/PostSupp',
    ]

    return Response(routes)


@api_view(['POST'])
def Signup(request):
    form = SignupForm(request.data)
    if form.is_valid():
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        Sexe = form.cleaned_data.get('Sexe')
        password = form.cleaned_data.get('password')
        DateDeNaissance = form.cleaned_data.get('DateDeNaissance')
        user = UserAccount.objects.create_user(first_name=first_name, last_name=last_name,
                                               email=email, password=password, DateDeNaissance=DateDeNaissance, Sexe=Sexe)
        return Response(UserAccountSerializer(user).data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def Login(request):
    try:
        expert = Expert.objects.get(email=request.data.get("email"))
        if (not expert.check_password(request.data.get("password"))):
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            data = ExpertSerializer(expert).data
            data.update({"isExpert": True})
            return Response(data, status=status.HTTP_200_OK)
    except Expert.DoesNotExist:
        try:
            user = UserAccount.objects.get(email=request.data.get("email"))
            if (not user.check_password(request.data.get("password"))):
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                data = UserAccountSerializer(user).data
                data.update({"isExpert": False})
                return Response(data, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getUserFullName(request):
    try:
        post = Post.objects.get(id=request.data.get("id"))
        user = UserAccount.objects.get(email=post.proprietaire)
        return Response({"nom": user.get_full_name()}, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getUserFullNameVer(request):
    try:
        post = PostVerifie.objects.get(id=request.data.get("id"))
        user = UserAccount.objects.get(email=post.proprietaire)
        return Response({"nom": user.get_full_name()}, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getExpertFullName(request):
    try:
        comment = ExpertComment.objects.get(id=request.data.get("id"))
        expert = Expert.objects.get(email=comment.idExpert)
        return Response({"nom": expert.get_full_name()}, status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getCommenterFullName(request):
    try:
        comment = Comment.objects.get(id=request.data.get("id"))
        user = UserAccount.objects.get(email=comment.idUser)
        return Response({"nom": user.get_full_name()}, status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def NombreDeCommentaire(request):
    try:
        NbComEx = ExpertComment.objects.filter(
            idPost=request.data.get("idPost")).count()
    except ExpertComment.DoesNotExist:
        NbComEx = 0
    try:
        NbComCy = Comment.objects.filter(
            idPost=request.data.get("idPost")).count()
    except Comment.DoesNotExist:
        NbComCy = 0

    return Response({"nb": NbComEx + NbComCy}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getNomreDePostAverf(request):
    NbP = Post.objects.all().count()
    return Response({"Nb": NbP}, status=status.HTTP_200_OK)


class postViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class articleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class commentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(idPost=self.kwargs['idPost'])
        return queryset


class expertcommentViewSet(viewsets.ModelViewSet):
    serializer_class = ExpertCommentSerializer

    def get_queryset(self):
        queryset = ExpertComment.objects.filter(idPost=self.kwargs['idPost'])
        return queryset


class PostVerifieViewSet(viewsets.ModelViewSet):
    queryset = PostVerifie.objects.all()
    serializer_class = PostVerifieSerializer


class PostSuppViewSet(viewsets.ModelViewSet):
    queryset = PostSupp.objects.all()
    serializer_class = PostSuppSerializer


class commentDetail(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ExpertcommentDetail(viewsets.ModelViewSet):
    queryset = ExpertComment.objects.all()
    serializer_class = ExpertCommentSerializer
