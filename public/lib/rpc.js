// public/lib/rpc.js
import { BATCHEXECUTE_URL } from './constants.js';

export async function rpcCall(method, params, auth, sourcePath) {
  // Construire l'URL
  const url = new URL(BATCHEXECUTE_URL);
  url.searchParams.set('f.sid', auth.sessionId);
  url.searchParams.set('source-path', sourcePath);

  // Construire le payload
  const requestPayload = [[[method, JSON.stringify(params), null, 'generic']]];
  
  const body = new URLSearchParams({
    'f.req': JSON.stringify(requestPayload),
    'at': auth.csrfToken,
  });

  // Headers
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Same-Domain': '1',
  };

  console.log('📡 RPC Call:', { method, url: url.toString() });

  // Faire l'appel
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`RPC call failed: ${response.status} ${response.statusText}`);
  }

  const rawResponse = await response.text();
  console.log('📥 Raw response:', rawResponse.substring(0, 200) + '...');

  // Parser
  return parseRPCResponse(rawResponse);
}

function parseRPCResponse(rawResponse) {
  // 1. Enlever le préfixe XSSI
  const cleaned = rawResponse.replace(/^\)\]\}'\n/, '');
  
  // 2. Parser le JSON
  const parsed = JSON.parse(cleaned);
  
  // 3. Extraire le résultat
  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('Invalid RPC response format');
  }

  const wrappedResult = parsed[0];
  if (!Array.isArray(wrappedResult) || wrappedResult.length < 3) {
    throw new Error('Invalid RPC response structure');
  }

  const resultString = wrappedResult[2];
  if (typeof resultString === 'string') {
    return JSON.parse(resultString);
  }

  return resultString;
}
