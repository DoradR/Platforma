from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from base.models import Article

from base.serializers import ArticleSerializer

@api_view(['GET'])
def getArticles(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getArticle(request, pk):
    article = Article.objects.get(_id=pk)
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createArtile(request):
    article = Article.objects.create(
        title='Przykładowy tytuł',
        content='Przykładowa treść',
    )
    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateArticle(request, pk):
    data = request.data
    article = Article.objects.get(_id=pk)

    article.name = data['title']
    article.price = data['content']

    article.save()

    serializer = ArticleSerializer(article, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteArticle(request, pk):
    article = Article.objects.get(_id=pk)
    article.delete()
    return Response('Artykuł został usunięty.')


@api_view(['POST'])
def uploadImageToArticle(request):
    data = request.data

    article_id = data['article_id']
    article = Article.objects.get(_id=article_id)

    article.image = request.FILES.get('image')
    article.save()
    return Response('Zdjęcie zostało dodane.')