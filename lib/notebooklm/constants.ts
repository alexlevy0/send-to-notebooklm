export const NOTEBOOKLM_BASE_URL = 'https://notebooklm.google.com';
export const BATCHEXECUTE_URL = `${NOTEBOOKLM_BASE_URL}/_/LabsTailwindUi/data/batchexecute`;

export enum RPCMethod {
  LIST_NOTEBOOKS = 'wXbhsf', // List notebooks (and create?)
  CREATE_NOTEBOOK = 'CCqFvf', // Create notebook (different RPC ID)
  ADD_SOURCE = 'izAoDd', // Add source
}
