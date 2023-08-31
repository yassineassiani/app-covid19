from rest_framework import serializers
from .models import Article, Comment, Expert, ExpertComment, PostSupp, PostVerifie, UserAccount, Post


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email',
                  'DateDeNaissance', 'Sexe', "id",)


class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = ('first_name', 'last_name', 'email',
                  'DateDeNaissance', 'Sexe', "id",)


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("proprietaire", "description", "im", "vd", "bv", "id")


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ("proprietaire", "title", "description", "im", "b", "id",)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("idPost", "idUser", "description", "sentiment", "id")


class ExpertCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertComment
        fields = ("idPost", "idExpert", "description", "sentiment", "id")


class PostVerifieSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostVerifie
        fields = ("proprietaire", "description",
                  "im", "vd", "bc", "id", "sentiment")


class PostSuppSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostSupp
        fields = ("proprietaire", "description", "im", "vd", "id")
