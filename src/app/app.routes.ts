import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import { GuestLayout } from './layouts/guest-layout/guest-layout';
import { UserManagement } from './components/user-management/user-management';
import { RoomManagement } from './components/room-management/room-management';
import { BookingManagement } from './components/booking-management/booking-management';
import { RoomDetails } from './components/room-details/room-details';
import { Reports } from './components/reports/reports';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { NotFound } from './components/not-found/not-found';
import { Main } from './layouts/main/main';
import { Auth } from './layouts/auth/auth';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: Login, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },   
    { path: "guestBooking", component: GuestLayout, canActivate: [AuthGuard] },
    { path: 'login', component: Login, canActivate: [AuthGuard] },
    { path: 'signup', component: Signup, canActivate: [AuthGuard] },
    { path: 'main', component: Main,canActivate: [AuthGuard],children: [
            { path: 'dashboard', canActivate: [AuthGuard], component: Dashboard },
            { path: 'userManagement', canActivate: [AuthGuard], component: UserManagement },
            { path: 'roomManagement', canActivate: [AuthGuard], component: RoomManagement },
            { path: 'bookingManagement', canActivate: [AuthGuard], component: BookingManagement },
            { path: 'roomDetails', canActivate: [AuthGuard], component: RoomDetails },
            { path: 'reports', canActivate: [AuthGuard], component: Reports },
            { path: 'about', canActivate: [AuthGuard], component: About },
            { path: 'contact', canActivate: [AuthGuard], component: Contact },
            { path: 'privacyPolicy', canActivate: [AuthGuard], component: PrivacyPolicy },
        ]
    },
         { path: '**', component: NotFound},
    { path: 'auht', component: Auth }
];
