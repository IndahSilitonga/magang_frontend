import type { UserRole } from '../types/auth';

export const MOCK_USERS: UserRole[] = [
  { 
    name: 'Ika', 
    roles: ['Kapokja A', 'Kapokja C'], 
    color: 'bg-blue-100 text-blue-800' 
  },
  { 
    name: 'Swandi', 
    roles: ['PIC A.1', 'PIC B.1'], 
    color: 'bg-green-100 text-green-800' 
  },
  { 
    name: 'Danu', 
    roles: ['PIC C.1', 'Developer'], 
    color: 'bg-purple-100 text-purple-800' 
  },
  { 
    name: 'Pemilik Software', 
    roles: ['RFC Submission'], 
    color: 'bg-orange-100 text-orange-800' 
  },
];

export const DEMO_CREDENTIALS = {
  email: 'admin@company.com',
  password: 'password123'
};