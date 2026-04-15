
export enum EUserRole{
  ADMIN = 'Admin',
 MANAGER = 'Manager',
 ACCOUNTAT = 'Accountant',
 RECEPTIONIST = 'Receptionist',
 GUESTUSER = 'GuestUser'
}

export interface Account {
  id: number;
  name: string;
  email: string;
  password : string;
  role?: EUserRole;
}