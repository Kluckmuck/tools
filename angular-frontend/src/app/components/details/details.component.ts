import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  company: Company | undefined;
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private location: Location
) { }

  ngOnInit() {
    this.getCompany();
  }

  getCompany(): void {
    this.companyService.getCompany(parseInt(this.route.snapshot.paramMap.get('id')))
    .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }
}
