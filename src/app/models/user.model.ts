
export enum EUserRole{
 ADMIN = 'Admin',
 MANAGER = 'Manager',
 ACCOUNTAT = 'Accountant',
 RECEPTIONIST = 'Receptionist' 
}

export interface User {
  id: number;
  name: string;
  email: string;
  password : string;
  role: EUserRole;
  status: string;
}