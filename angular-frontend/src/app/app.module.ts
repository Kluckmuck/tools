import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DetailsComponent } from "./components/details/details.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  MatDialogModule,
  MatInputModule,
  MatNativeDateModule,
  MatToolbarModule,
} from "@angular/material";
import { BookingModalComponent } from "./components/booking-modal/booking-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserSignupComponent } from "./components/user-signup/user-signup.component";
import {
  AuthGuard,
  AuthInterceptor,
  AuthService,
} from "./services/auth.service";
import { HeaderComponent } from "./components/header/header.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { UserDetailComponent } from "./components/user-profile/user-detail/user-detail.component";
import { UserBookingsComponent } from './components/user-profile/user-bookings/user-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DetailsComponent,
    BookingModalComponent,
    UserLoginComponent,
    UserSignupComponent,
    HeaderComponent,
    UserProfileComponent,
    UserDetailComponent,
    UserBookingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  entryComponents: [BookingModalComponent],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
