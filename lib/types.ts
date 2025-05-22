export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  isPremium: boolean;
  isAdmin: boolean;
  tabzBalance: number;
}

export interface AuthResponse {
  success: boolean;
  error?: string; // Si une erreur survient, cette propriété sera définie
  user?: User;    // L'utilisateur peut être inclus dans la réponse en cas de succès
}


export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
}

// lib/types.ts

export interface SessionData {
  sessionId: string;
  createdAt: Date;
  ipAddress: string;
  userAgent: string;
}

export interface AccountData {
  provider: string; // Ex: 'github', 'google', 'email'
  providerAccountId: string;
  type: 'oauth' | 'email' | 'credentials';
  createdAt: Date;
  isPremium: boolean; // Peut-être utile si tu as un compte premium
}

export interface CustomSession {
  user: {
    id?: string;
    githubId?: string;
    email?: string;
    image?: string; // Image utilisateur
    name?: string;  // Nom affiché
    createdAt: Date;
    updatedAt: Date;
    favoriteIds: string[];
    sessions: SessionData[];  // Historique des sessions utilisateur
    account: AccountData[];   // Comptes liés à différents fournisseurs d'authentification
    isPremium: boolean;
    admin: boolean;
  };
  admin?: boolean;
  emailVerified?: boolean | Date;
}

export interface Account {
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
}

export interface Reward {
  id: string;
  type: string;
  amount: number;
  claimed: boolean;
  createdAt: Date;
  userId: string;
}