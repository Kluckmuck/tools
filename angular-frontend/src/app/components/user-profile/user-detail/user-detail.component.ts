import { Component, Input, OnInit } from "@angular/core";
import { Company } from "src/app/models/Company";
import { CompanyService } from "src/app/services/company.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.sass"],
})
export class UserDetailComponent implements OnInit {
  @Input() companyId: string = "";
  company: Company;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.getCompany();
  }

  getCompany() {
    if (!!this.companyId) {
      this.companyService
        .getCompany(parseInt(this.companyId))
        .subscribe((company) => {
          this.company = company;
        });
    }
  }
}
