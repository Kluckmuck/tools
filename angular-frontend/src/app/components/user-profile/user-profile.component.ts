import { Component, Input, OnInit } from "@angular/core";
import { Company } from "src/app/models/Company";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.sass"],
})
export class UserProfileComponent implements OnInit {
  user: User;
  company: Company;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.company = user.companies[0];
      console.log(this.user);
    });
  }
}
