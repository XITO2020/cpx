import type { Session as NextAuthSession } from 'next-auth';

export interface CustomSession extends Omit<NextAuthSession, 'user'> {
  user: User;
  expires: string;
};

export type User = {
    id: string;
    name: string;
    image?: string;
    email?: string;
    emailVerified?: Date;
    hashedPassword?: string;
    githubId: string;
    createdAt: Date;
    updatedAt: Date;
    favoriteIds: string[];
    sessions: CustomSession[];
    account: Account[];
    isPremium: Boolean;
    premiumDuration: Number;
    provider?: string;
    admin: Boolean;
    comments: string[];
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
    videoUrl: string;
    thumbnailUrl: string;
    genre: string;
    duration: string;
    language: string;
    author: string;
    rating: number;
    year: number;
    comments: []; 
    favoriteLength: number;
    views: number;
    linkedArticle:[] ;
    linkedArticles: LinkedArticle[];
    outfileArticle: [] ;
    isTrending: boolean;
    premium: boolean;
    premiumDuration: number;
  };

  export type LinkedArticle = {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    userId: string;
    movieId: string;
    user: User;
    movie: Movie;
    imageOne?:string;
    imageTwo?:string;
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
    user: User;
    movie: Movie;
  };
  
  export type ServerAuthResponse = {
    success: boolean;
    error?: string;
    currentUser?: User;
  };
  