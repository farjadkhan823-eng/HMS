import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { UserManagement } from './components/user-management/user-management';
import { RoomManagement } from './components/room-management/room-management';
import { RoomDetails } from './components/room-details/room-details';
import { StandardRoomDetails } from './components/standard-room-details/standard-room-details';
import { DeluxRoomDetails } from './components/delux-room-details/delux-room-details';
import { SuitRoomDetails } from './components/suit-room-details/suit-room-details';
import { Booking } from './components/booking/booking';
import { Reports } from './components/reports/reports';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { Main } from './layouts/main/main';
import { Auth } from './layouts/auth/auth';

export const routes: Routes = [
{path: '' , component:Login},
{path : 'login' , component:Login},
{path : 'main', component:Main , children : [
{path : 'dashboard', component:Dashboard},
{path : 'userManagement', component:UserManagement},
{path : 'roomManagement', component:RoomManagement},
{path : 'roomDetails', component: RoomDetails , children : [
{path : 'standardRoomDetails', component: StandardRoomDetails},
{path : 'deluxRoomDetails', component: DeluxRoomDetails},
{path : 'suitRoomDetails', component: SuitRoomDetails},
]},
{path : 'booking', component:Booking},
{path : 'reports', component:Reports},
{path : 'about', component:About},
{path : 'contact', component:Contact},
{path : 'privacyPolicy', component:PrivacyPolicy},
]} ,
{path : 'auht', component:Auth}
];
