export interface Notebook {
  id: string;
  title: string;
}

export interface AuthTokens {
  cookies: Record<string, string>;
  csrfToken: string;
  sessionId: string;
  timestamp: number;
}
