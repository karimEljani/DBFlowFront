import { Role } from './role';

export interface Users {
  userId?: number; // Optional user ID
  username: string; // Required username
  name: string; // Required name
  password: string; // Required password
  role: Role[]; // Role(s) assigned to the user
  id: any; // Unique identifier
  code: string; // Arbitrary code
  image: string; // Image URL or path
  response:string;
  activated:string;
}
