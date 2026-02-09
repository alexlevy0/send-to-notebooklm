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

export interface RpcResponseEnvelope {
  // [method, jsonString, null, "generic"]
  0: string;
  1: string;
  2: any;
  3: string;
}

export interface ListNotebooksResponseItem {
  0: string; // Title
  2: string; // ID
}
