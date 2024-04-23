import { User } from './user';

export interface Rating {
  id: number;
  stars: number;
  description: string;
  user: User;
  created_at: string;
  modified_at: string;
}
