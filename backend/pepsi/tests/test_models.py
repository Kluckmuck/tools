from django.test import TestCase

from pepsi.models import Booking, Company, Message
from django.contrib.auth.models import User

import datetime
from datetime import date
from django.utils import timezone


# Create your tests here.


class CompanyTestCase(TestCase):
    def setUp(self):
        datetime.datetime.now(tz=timezone.utc)  # you can use this value

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

    def test_can_manage_valid(self):
        company: Company = Company.objects.get(name="ABBA")

        self.assertEqual(company.can_manage_company(self.user), True)

    def test_can_manage_invalid(self):
        company: Company = Company.objects.get(name="ABBA")
        nonValidUser = User.objects.create_user("Mariah", "mariah@carrey.com", "1234")

        self.assertEqual(company.can_manage_company(nonValidUser), False)


class BookingTestCase(TestCase):
    def setUp(self):
        datetime.datetime.now(tz=timezone.utc)  # you can use this value

        self.user = User.objects.create_user(
            "Jim Carrey", "jim@carrey.com", "jimspassword"
        )

        self.company = Company.objects.create(
            name="ABBA",
            description="Fishball creators",
            location="Gothenburg",
            owner=self.user,
        )

        Booking.objects.create(
            comments="A test booking",
            location="Testville",
            date=timezone.now(),
            operator=self.company,
            owner=self.user,
        )

    def test_initial_booking_status(self):
        booking = Booking.objects.get(location="Testville")
        self.assertEqual(booking.status, "PN")

    def test_accept_booking_status(self):
        booking = Booking.objects.get(location="Testville")
        booking.accept_booking()
        self.assertEqual(booking.status, "AC")

    def test_deny_booking_status(self):
        booking = Booking.objects.get(location="Testville")
        booking.deny_booking()
        self.assertEqual(booking.status, "DN")


class MessageTestCase(TestCase):
    def setUp(self):
        datetime.datetime.now(tz=timezone.utc)  # you can use this value

        self.user = User.objects.create_user(
            "Jim Carrey", "jim@carrey.com", "jimspassword"
        )

        self.company = Company.objects.create(
            name="ABBA",
            description="Fishball creators",
            location="Gothenburg",
            owner=self.user,
        )

        self.booking = Booking.objects.create(
            comments="A test booking",
            location="Testville",
            date=timezone.now(),
            operator=self.company,
            owner=self.user,
        )
        self.message = Message.objects.create(
            booking=self.booking,
            name="Viktor",
            body="This is a message sent to someone",
        )

    def test_create_message(self):
        message = Message.objects.get(name="Viktor")

        self.assertEqual(message.body, "This is a message sent to someone")
        self.assertEqual(message.booking, self.booking)

    def test_str(self):
        message = Message.objects.get(name="Viktor")
        self.assertEqual(
            str(message), "'This is a message sent to someone' sent by Viktor"
        )

    # def test_order(self):
    #     Message.objects.create(
    #         booking=self.booking,
    #         name="Jonathan",
    #         body="Hallå hur är det läget?",
    #     )
    #     Message.objects.create(
    #         booking=self.booking,
    #         name="En grabb",
    #         body="Inte så bra tack som frågar.",
    #     )

    #     booking = Booking.objects.get(location="Testville")
    #     self.assertEqual(booking, "hej")
