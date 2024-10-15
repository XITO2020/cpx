import type { Session as NextAuthSession } from 'next-auth';

export interface CustomSession extends Omit<NextAuthSession, 'user'> {
  user: User;
  expires: string;
  admin: boolean;
  email: string;
  emailVerified: boolean;
}

export type User = {
  id: string;
  name: string;
  image?: string;
  email?: string;
  emailVerified?: boolean;
  hashedPassword?: string;
  githubId?: string;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
  sessions: CustomSession[];
  account: Account[];
  isPremium: boolean;
  premiumDuration?: number;
  provider?: string;
  admin: boolean;
  linkedArticles?: LinkedArticle[];
  userMovies?: UserMovie[];
  comments?: Comment[];
};

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
};

export type VerificationToken = {
  id: string;
  identifier: string;
  token: string;
  expires: Date;
};

export type Movie = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  videoUrl: string;
  language?: string;
  author?: string;
  duration?: string;
  verificationLevel?: number;
  year?: number;
  rating?: number;
  favoriteLength: number;
  views: number;
  outfileArticle?: string;
  isTrending: boolean;
  isPremium: boolean;
  premiumDuration: number;
  movieArticles?: MovieArticle[];
  comments?: Comment[];
  movieGenres?: MovieGenre[];
};

export type LinkedArticle = {
  id: string;
  title: string;
  description: string;
  date: Date;
  userId: string;
  movieId: string;
  imageOne?: string;
  imageTwo?: string;
  user: User;
  movie: Movie;
  movieArticles?: MovieArticle[];
  comments?: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  date: Date;
  likes: number;
  dislikes: number;
  ambiguous: number;
  best: boolean;
  userId: string;
  movieId: string;
  linkedArticleId?: string;
  user: User;
  movie: Movie;
  linkedArticle?: LinkedArticle;
};

export type Genre = {
  id: string;
  name: string;
  qty: Number;
  movieGenres?: MovieGenre[];
};

export type UserMovie = {
  id: string;
  userId: string;
  movieId: string;
  user: User;
  movie: Movie;
};

export type MovieArticle = {
  id: string;
  movieId: string;
  articleId: string;
  movie: Movie;
  linkedArticle: LinkedArticle;
};

export type MovieGenre = {
  id: string;
  movieId: string;
  genreId: string;
  movie: Movie;
  genre: Genre;
};

export type ServerAuthResponse = {
  success: boolean;
  error?: string;
  currentUser?: User;
};
