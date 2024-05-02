export interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  total_rating: number;
  avg_rating: number;
  thumbnail: string;
  type: string;
  trailer_url: string;
}

export interface RatingPayload {
  stars: number;
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
