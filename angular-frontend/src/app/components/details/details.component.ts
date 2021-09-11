import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { Company } from 'src/app/models/Company';
import { Booking } from 'src/app/models/Booking';
import { CompanyService } from 'src/app/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  company: Company | undefined;
  booking: Booking | undefined;
  hideBookings: boolean = false;

  constructor(
    private companyService: CompanyService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCompany();
  }

  showBookings(): void {
    this.hideBookings =! this.hideBookings;
  }

  getCompany(): void {
    this.companyService.getCompany(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(company => {
        this.company = company;
        console.log(company);
      });
  }

  goBack(): void {
    this.location.back();
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookingModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.valid) {
        this.booking = result.getRawValue();
        this.booking.operator = this.company.id;
        this.bookingService
          .createBooking(this.booking)
          .subscribe(data => this.booking = data);
      } else {
        console.log("not valid");
      }
    });
  }
}
