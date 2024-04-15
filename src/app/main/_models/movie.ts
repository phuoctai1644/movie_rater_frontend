export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  total_rating: number;
  avg_rating: number;
  thumbnail: string;
  type: string;
  trailerUrl?: string;
}

export interface Rating {
  id: number;
  user: User;
  movie: Movie;
  stars: number;
}

export interface RatingPayload {
  stars: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
