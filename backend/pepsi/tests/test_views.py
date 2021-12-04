from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User

from pepsi.models import Company


class CompanyViewsTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(
            "Jim Carrey", "jim@carrey.com", "jimspassword"
        )

        Company.objects.create(
            name="ABBA",
            description="Fishball creators",
            location="Gothenburg",
            owner=self.user,
        )

    def test_get_all_companies(self):
        response = self.factory.get("/api/company/")
        self.assertEqual(response.status_code, 401)

    # def test_get_company(self):
