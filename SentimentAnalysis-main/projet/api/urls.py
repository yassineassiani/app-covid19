from django.urls import include, path
from . import views
from .views import ExpertcommentDetail, Login, NombreDeCommentaire, PostSuppViewSet, PostVerifieViewSet, Signup, commentDetail, getCommenterFullName, getNomreDePostAverf, getUserFullNameVer
from .views import articleViewSet, commentViewSet, expertcommentViewSet, getExpertFullName, getUserFullName, postViewSet
from django.conf import settings
from rest_framework.routers import DefaultRouter
from api.views import articleViewSet, postViewSet

router = DefaultRouter()
router.register('articles', articleViewSet, basename='articles')
router.register('posts', postViewSet, basename='posts')
router.register('Comments', commentViewSet, basename='Comments')
router.register('ExpertComments', expertcommentViewSet,
                basename='ExpertComments')
router.register('PostVerifie', PostVerifieViewSet, basename='PostVerifie')
router.register('PostSupp', PostSuppViewSet, basename='PostSupp')
router.register('commentDetail', commentDetail, basename='commentDetail')
router.register('ExpertcommentDetail', ExpertcommentDetail,
                basename='ExpertcommentDetail')

urlpatterns = [
    path('', views.getRoutes),
    path('', include(router.urls)),
    path('signup/', Signup, name='signup'),
    path('login/', Login, name='login'),
    path('UserFullName/', getUserFullName, name='UserFullName'),
    path('ExpertFullName/', getExpertFullName, name='ExpertFullName'),
    path('NombreDeCommentaire/', NombreDeCommentaire, name='NombreDeCommentaire'),
    path('NomreDePostAverf/', getNomreDePostAverf, name='NomreDePostAverf'),
    path('UserFullNameVer/', getUserFullNameVer, name='UserFullNameVer'),
    path('CommenterFullName/', getCommenterFullName, name='CommenterFullName'),
    path('comments/<int:idPost>/',
         commentViewSet.as_view({'get': 'list'}), name='comment-detail'),
    path('expertComments/<int:idPost>/',
         expertcommentViewSet.as_view({'get': 'list'}), name='comment-detail'),


]
