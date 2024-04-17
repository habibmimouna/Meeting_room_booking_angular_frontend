import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "reservation", component: ReservationComponent },
    { path: "Account", component: AccountComponent },
    { path: "auth/login", component: LoginComponent },
    { path: "auth/register", component: RegisterComponent },
    { path: "booking/:id", component: BookingComponent },
];
