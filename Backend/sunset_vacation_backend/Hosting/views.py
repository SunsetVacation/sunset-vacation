from unicodedata import category
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.mixins import UpdateModelMixin,DestroyModelMixin
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from Authentication.models import *
from Authentication.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view(["GET"])
def getProperties(request):
    try:
        
        user=User.objects.get(id=1)
        
        property=Property.objects.filter(owner_id_id=user)

       
        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property, many=True)
        #print(propertySerializer.data)
        return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # if propertySerializer.is_valid():
        #     return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # else:
        #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getPropertyDetails(request,property_id):
    try:
        
        property=Property.objects.get(property_id=property_id)

       
        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property)
        
        photos = PropertyPhotos.objects.filter(property_id=property)
        photoSerializer = PropertyPhotoSerializer(photos, many=True)



        return Response({"property": propertySerializer.data, "photos": photoSerializer.data}, status= status.HTTP_200_OK)
        # if propertySerializer.is_valid():
        #     return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # else:
        #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getProperty(request,property_id):
    try:
        propertyInfo=Property.objects.get(propertyID=property_id)
        propertySerializer=PropertySerializer(propertyInfo)
        photos = PropertyPhotos.objects.filter(property_id=propertyInfo)
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        return Response({"property": propertySerializer.data, "photos": photoSerializer.data}, status= status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
@api_view(["PUT"])
def updatePropertyDetails(request,property_id):
    propertyInfo=Property.objects.get(propertyID=property_id)
    serializer = PropertySerializer(propertyInfo,request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error":"error 404"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
def deleteProperty(request,property_id):
    propertyInfo=Property.objects.get(propertyID=property_id)
    propertyInfo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCategoryList(request):
    allCategories = Catagory.objects.values_list("description")
    categorySerializer = CatagorySerializer(allCategories)
    print(allCategories)
    return Response({"categories": allCategories, "success": True}, status=status.HTTP_200_OK)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getFacilityList(request):
    amenities = Facility.objects.filter(catagory="Amenity").values_list("facility_name")
    guestsFavourite = Facility.objects.filter(catagory="Guests favourite").values_list("facility_name")
    safetyItems = Facility.objects.filter(catagory="Safety item").values_list("facility_name")
    print(amenities)
    print(guestsFavourite)
    print(safetyItems)
    if amenities.exists() and guestsFavourite.exists() and safetyItems.exists():
        return Response({"amenities": amenities,"guestsFavourite": guestsFavourite,"safetyItems": safetyItems, "success": True}, status=status.HTTP_200_OK)

    else:
        return Response({"success": False, "error" : "error 404 OT FOUND"}, status = status.HTTP_404_NOT_FOUND)

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getSafetyItemList(request):
#     safetyItems = Facility.objects.filter(category="safetyitem").values_list("facility_name")
#     print(safetyItems)
#     return Response({ "safetyItems": safetyItems, "success": True}, status=status.HTTP_200_OK)



# class Property(
#     APIView,
#     UpdateModelMixin,
#     DestroyModelMixin,
# ):
#     def get(self,request):
#         try:
#             print("hello1")
#             property=Property.objects.all()

#             propertySerializer = PropertySerializer(property, many=True)

#             if propertySerializer.is_valid():
#                 return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
#             else:
#                 return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Property.DoesNotExist:
#             return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
