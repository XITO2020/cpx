// types.ts, trouver comment utiliser ce fichier ca va etre un vrai casse tete,
//il est censé facilité l'utilisation des props de chaque objets
//je tenterai avec User dans plusieurs fichiers type favorite.ts, serverAuth.ts...

export type User = {
    id: string;
    name: string;
    image?: string;
    email?: string;
    emailVerified?: Date;
    hashedPassword?: string;
    createdAt: Date;
    updatedAt: Date;
    favoriteIds: string[];
    sessions: Session[];
    account: Account[];
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
  
  export type Session = {
    id: string;
    SessionToken: string;
    userId: string;
    expires: Date;
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
    rating: number;
    year: number;
    comments: []; 
    favoriteLength: [];
    views: number;
    linkedArticle:[] ;
    outfileArticle: [] ;
  };
  
  export type ServerAuthResponse = {
    success: boolean;
    error?: string;
    currentUser?: User;
  };
  