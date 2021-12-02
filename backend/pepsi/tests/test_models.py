from django.test import TestCase

from pepsi.models import Company
from django.contrib.auth.models import User


# Create your tests here.


class CompanyTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            "Jim Carrey", "jim@carrey.com", "jimspassword"
        )

        Company.objects.create(
            name="ABBA",
            description="Fishball creators",
            location="Gothenburg",
            owner=self.user,
        )

    def test_create_company(self):
        company = Company.objects.get(name="ABBA")
        self.assertEqual(company.description, "Fishball creators")
        self.assertEqual(company.location, "Gothenburg")

    def test_str(self):
        company = Company.objects.get(name="ABBA")
        self.assertEqual(str(company), "ABBA")

    def test_first_name_max_length(self):
        company = Company.objects.get(name="ABBA")
        max_length = company._meta.get_field("name").max_length
        self.assertEqual(max_length, 120)

    def test_claim(self):
        company: Company = Company.objects.get(name="ABBA")
        self.user2 = User.objects.create_user(
            "Arnold", "arnold@carrey.com", "arnoldspassword"
        )

        company.claim(self.user2)
        self.assertEqual(company.owner, self.user2)
