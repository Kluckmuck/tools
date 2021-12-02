""" from django.test import TestCase

from .models import Company

# Create your tests here.


class CompanyTestCase(TestCase):
    def setUp(self):
        Company.objects.create(
            name="ABBA",
            description="Fishball creators",
            location="Gothenburg",
        )

    def test_create_company(self):
        company = Company.objects.get("ABBA")
        self.assertEqual(company.description, "Fishball creators")
        self.assertEqual(company.location, "Gothenburg")
 """
