from typing import OrderedDict
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth.models import User
from pepsi.views import CompanyView

from pepsi.models import Booking, Company

import datetime
import pytz
from django.utils import timezone


class CompanyViewsTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        datetime.datetime.now(tz=timezone.utc)

        self.user = User.objects.create_user(
            "Jim Carrey", "jim@carrey.com", "jimspassword"
        )
        self.company = Company.objects.create(
            name="ABBA",
            description="Fishball creators",
            location="Gothenburg",
            owner=self.user,
        )

        Company.objects.create(
            name="Göteborgskex",
            description="Kex creators",
            location="Kungsbacka",
            owner=self.user,
        )

        Booking.objects.bulk_create(
            [
                Booking(
                    comments="A test booking",
                    location="Testville",
                    date=datetime.datetime(2011, 8, 15, tzinfo=pytz.UTC),
                    operator=self.company,
                    owner=self.user,
                ),
                Booking(
                    comments="A second test",
                    location="Testburg",
                    date=datetime.datetime(2012, 8, 15, tzinfo=pytz.UTC),
                    operator=self.company,
                    owner=self.user,
                ),
                Booking(
                    comments="A third test booking",
                    location="Testtown",
                    date=datetime.datetime(2013, 8, 15, tzinfo=pytz.UTC),
                    operator=self.company,
                    owner=self.user,
                ),
            ]
        )

        self.view = CompanyView.as_view({"get": "list"})

    def test_get_all_companies(self):
        user = User.objects.get(username="Jim Carrey")
        request = self.factory.get("/company/")
        force_authenticate(request, user=user)
        response = self.view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            [
                OrderedDict(
                    [
                        ("id", 1),
                        ("owner", 1),
                        ("name", "ABBA"),
                        ("description", "Fishball creators"),
                        ("location", "Gothenburg"),
                    ]
                ),
                OrderedDict(
                    [
                        ("id", 2),
                        ("owner", 1),
                        ("name", "Göteborgskex"),
                        ("description", "Kex creators"),
                        ("location", "Kungsbacka"),
                    ]
                ),
            ],
        )

    def test_owner_get_company(self):
        user = User.objects.get(username="Jim Carrey")
        request = self.factory.get("/api/company/1/")
        force_authenticate(request, user=user)
        view = CompanyView.as_view({"get": "retrieve"})

        response = view(request, pk=1)
        print(response.data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["bookings"]), 3)

    def test_not_owner_get_company(self):
        nonValidUser = User.objects.create_user("Mariah", "mariah@carrey.com", "1234")
        request = self.factory.get("/api/company/1/")
        force_authenticate(request, user=nonValidUser)
        view = CompanyView.as_view({"get": "retrieve"})
        response = view(request, pk=1)

        self.assertEqual(response.status_code, 200)
        self.assertRaises(KeyError, lambda: response.data["bookings"])
        self.assertEqual(
            response.data,
            {
                "id": 1,
                "owner": 1,
                "name": "ABBA",
                "description": "Fishball creators",
                "location": "Gothenburg",
            },
        )
