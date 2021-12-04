import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookingDetailsComponent } from "./components/booking-details/booking-details.component";
import { DetailsComponent } from "./components/details/details.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { UserSignupComponent } from "./components/user-signup/user-signup.component";
import { AuthGuard } from "./services/auth.service";

const routes: Routes = [
  { path: "", redirectTo: "/start", pathMatch: "full" },
  { path: "start", component: HomepageComponent },
  { path: "detail/:id", component: DetailsComponent, canActivate: [AuthGuard] },
  { path: "login", component: UserLoginComponent },
  { path: "signup", component: UserSignupComponent },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "booking/:id", component: BookingDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
