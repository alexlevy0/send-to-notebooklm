import { checkLimit, incrementUsage, LimitReachedError } from "../supabase";
import { getAuthTokens } from "./auth";
import { NOTEBOOKLM_BASE_URL, RPCMethod } from "./constants";
import { rpcCall } from "./rpc";
import type { ListNotebooksResponseItem, Notebook } from "./types";

export const NotebookLM = {
  async listNotebooks(): Promise<Notebook[]> {
    const auth = await getAuthTokens();

    // Params: [null, limit?]
    // Trying [null, 20] to see if it fetches more.
    const params = [null, 50];

    const response = await rpcCall(
      RPCMethod.LIST_NOTEBOOKS,
      params,
      auth,
      "notebooks",
    );

    // Response structure (from POC):
    // [ [ [Title, ..., ID], ... ] ]
    // result[0] is the list of notebooks.

    if (!response || !Array.isArray(response) || !response[0]) {
      console.warn("Unexpected listNotebooks response", response);
      return [];
    }

    const nbListRaw = response[0];
    if (!Array.isArray(nbListRaw)) {
      return [];
    }

    const notebooks: Notebook[] = nbListRaw
      .map((nb: ListNotebooksResponseItem) => {
        // Index 0: Title
        // Index 2: ID
        const title = nb[0];
        const id = nb[2];
        return { id, title };
      })
      .filter((nb) => nb.id && nb.title); // Filter out invalid ones

    return notebooks;
  },

  async addUrlSource(notebookId: string, urls: string[]): Promise<boolean> {
    const count = urls.length;
    
    // 1. Check Limits for the total number of sources
    const limitCheck = await checkLimit();
    if (!limitCheck.allowed || (limitCheck.remaining && limitCheck.remaining.daily < count)) {
      throw new LimitReachedError(
        limitCheck.reason || 'daily_limit',
        limitCheck.resetAt || new Date().toISOString(),
        limitCheck.remaining || { daily: 0, monthly: 0 }
      );
    }

    const auth = await getAuthTokens();

    // Payload structure for bulk ADD_SOURCE (izAoDd):
    // [ [ SourceObject1, SourceObject2, ... ], "NOTEBOOK_ID", [2], [1, null, ...] ]
    
    const sources = urls.map(url => [
      null, 
      null, 
      [url], 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      null, 
      1 // 1 = URL source type
    ]);

    const payload = [
      sources,
      notebookId,
      [2], // Flag batch/web
      [1, null, null, null, null, null, null, null, null, null, [1]] // Context
    ];

    try {
      await rpcCall(RPCMethod.ADD_SOURCE, payload, auth, "notebooks");
      
      // 2. Increment Usage
      await incrementUsage(count).catch(console.error); // Report the total count
      
      return true;
    } catch (e) {
      console.error("Failed to add sources:", e);
      throw e;
    }
  },

  async addTextSource(
    notebookId: string,
    title: string,
    content: string,
  ): Promise<boolean> {
    // 1. Check Limits
    const limitCheck = await checkLimit();
    if (!limitCheck.allowed) {
      throw new LimitReachedError(
        limitCheck.reason!,
        limitCheck.resetAt!,
        limitCheck.remaining! || { daily: 0, monthly: 0 }
      );
    }

    const auth = await getAuthTokens();

    // Payload structure for text source (Type 2):
    // [ [ [ null, [title, content], null, null, null, null, null, null ] ], "NOTEBOOK_ID", [2], null, null ]

    const payload = [
      [[null, [title, content], null, null, null, null, null, null]],
      notebookId,
      [2], // Source type flag for Text
      null,
      null,
    ];

    try {
      await rpcCall(
        RPCMethod.ADD_SOURCE,
        payload,
        auth,
        `notebook/${notebookId}`,
      );
      
      // 2. Increment Usage
      await incrementUsage().catch(console.error);
      
      return true;
    } catch (e) {
      console.error("Failed to add text source:", e);
      throw e;
    }
  },


  async createNotebook(title: string): Promise<Notebook> {
    const auth = await getAuthTokens();

    // Payload from notebooklm-kit analysis:
    // [title, null, null, [2], [1, null, null, null, null, null, null, null, null, [1]]]
    const innerPayload = [
      title, 
      null, 
      null, 
      [2], 
      [1, null, null, null, null, null, null, null, null, [1]]
    ];

    const payload = [
        innerPayload
    ];

    // NOTE: The RPC call for 'wXbhsf' usually expects a specific array structure.
    // In `rpcCall`, we wrap the params in a specific way. 
    // `listNotebooks` uses `[null, 50]`.
    // `createNotebook` uses `[null, 1, title, [2]]`.
    // We need to pass this `innerPayload` as the `params` argument to `rpcCall`.

    try {
      const response = await rpcCall(
        RPCMethod.CREATE_NOTEBOOK, // wXbhsf
        innerPayload,
        auth,
        "notebooks" // endpoint suffix (might need to be just 'notebooks' or empty?)
      );
      
      // Response Analysis:
      // The response to `wXbhsf` (when creating) likely contains the new notebook ID.
      // Since we don't know the exact structure, we'll search for a UUID-like string in the response tree.
      
      const responseStr = JSON.stringify(response);
      console.log("Create Notebook Response:", responseStr);

      // UUID Regex (approximate for NotebookLM IDs which are UUIDs)
      const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
      const match = responseStr.match(uuidRegex);

      if (match) {
        return {
          id: match[0],
          title: title
        };
      } else {
        console.warn("Could not find Notebook ID in response. Falling back to list refresh.");
        
        // Fallback: Fetch list and find the notebook by title
        // We wait a short bit to ensure propagation? usually RPC is consistent but let's just call it.
        const notebooks = await this.listNotebooks();
        
        // Find notebook with same title. 
        // If multiple, ideally we'd pick the one that wasn't there before, but we don't have the old list here easily.
        // We'll pick the first one found (or maybe we should check for exact match).
        const created = notebooks.find(nb => nb.title.trim() === title.trim());
        
        if (created) {
           return created;
        }
        
        throw new Error("Notebook creation RPC succeeded, but could not find the new notebook in the list.");
      }

    } catch (e) {
      console.error("Failed to create notebook:", e);
      throw e;
    }
  }
};
