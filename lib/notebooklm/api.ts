import { getAuthTokens } from "./auth";
import { NOTEBOOKLM_BASE_URL, RPCMethod } from "./constants";
import { rpcCall } from "./rpc";
import type { Notebook } from "./types";

export const NotebookLM = {
  async listNotebooks(): Promise<Notebook[]> {
    const auth = await getAuthTokens();

    // Params: [null, limit?]
    // Trying [null, 20] to see if it fetches more.
    const params = [null, 50];

    const response = await rpcCall(RPCMethod.LIST_NOTEBOOKS, params, auth, "notebooks");

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
      .map((nb: any) => {
        // Index 0: Title
        // Index 2: ID
        const title = nb[0];
        const id = nb[2];
        return { id, title };
      })
      .filter((nb) => nb.id && nb.title); // Filter out invalid ones

    return notebooks;
  },

  async addUrlSource(notebookId: string, url: string): Promise<boolean> {
    const auth = await getAuthTokens();

    // Payload structure found in notebooklm-kit:
    // [ [ [ null, null, ["URL"], null, null, null, null, null, null, null, 1 ] ], "NOTEBOOK_ID" ]
    
    const payload = [
      [
        [
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
        ]
      ],
      notebookId
    ];

    try {
      await rpcCall(RPCMethod.ADD_SOURCE, payload, auth, "notebooks");
      return true;
    } catch (e) {
      console.error("Failed to add source:", e);
      throw e;
    }
  },

  async addTextSource(notebookId: string, title: string, content: string): Promise<boolean> {
    const auth = await getAuthTokens();

    // Payload structure for text source (Type 2):
    // [ [ [ null, [title, content], null, null, null, null, null, null ] ], "NOTEBOOK_ID", [2], null, null ]
    
    const payload = [
      [
        [
          null, 
          [title, content], 
          null, 
          null, 
          null, 
          null, 
          null, 
          null
        ]
      ],
      notebookId,
      [2], // Source type flag for Text
      null, 
      null
    ];

    try {
      await rpcCall(RPCMethod.ADD_SOURCE, payload, auth, `notebook/${notebookId}`);
      return true;
    } catch (e) {
      console.error("Failed to add text source:", e);
      throw e;
    }
  },
};
