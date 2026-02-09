import { BATCHEXECUTE_URL } from "./constants";
import { getAuthTokens } from "./auth";
import type { AuthTokens } from "./types";

export async function rpcCall(
  method: string,
  params: any,
  auth: AuthTokens,
  sourcePath = "notebooks",
  retryCount = 0
): Promise<any> {
  const url = new URL(BATCHEXECUTE_URL);
  url.searchParams.set("f.sid", auth.sessionId);
  url.searchParams.set("source-path", sourcePath);

  const requestPayload = [[[method, JSON.stringify(params), null, "generic"]]];

  const body = new URLSearchParams({
    "f.req": JSON.stringify(requestPayload),
    at: auth.csrfToken,
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "X-Same-Domain": "1",
  };

  const response = await fetch(url.toString(), {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (response.status === 401 || response.status === 403) {
    if (retryCount < 1) {
      console.warn(`RPC ${response.status} - Retrying with fresh tokens...`);
      const newAuth = await getAuthTokens(true);
      return rpcCall(method, params, newAuth, sourcePath, retryCount + 1);
    }
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error('RPC Error Body:', errorText.substring(0, 500));
    throw new Error(
      `RPC call failed: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}`
    );
  }

  const rawResponse = await response.text();
  const cleaned = rawResponse.replace(/^\)\]\}'\n/, "");

  let parsed: any[];
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error("Invalid JSON in RPC response");
  }

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid RPC response format (empty)");
  }

  const envelope =
    parsed.find((item: any) => Array.isArray(item) && item[0] === method) ||
    parsed[0];

  if (!envelope || !Array.isArray(envelope) || envelope.length < 3) {
    throw new Error("Invalid RPC response structure");
  }

  const resultString = envelope[2];

  if (typeof resultString === "string") {
    return JSON.parse(resultString);
  }

  return resultString;
}
