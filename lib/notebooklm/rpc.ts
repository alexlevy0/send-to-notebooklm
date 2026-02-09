import { BATCHEXECUTE_URL } from "./constants";
import type { AuthTokens } from "./types";

export async function rpcCall(
  method: string,
  params: any,
  auth: AuthTokens,
  sourcePath = "notebooks",
): Promise<any> {
  // Build URL
  const url = new URL(BATCHEXECUTE_URL);
  url.searchParams.set("rpcids", method);
  url.searchParams.set("f.sid", auth.sessionId);
  url.searchParams.set("bl", "boq_notebooklib_ui_20240312.00_p1"); // Optional version, might help
  url.searchParams.set("hl", "en");
  url.searchParams.set("soc-app", "1");
  url.searchParams.set("soc-platform", "1");
  url.searchParams.set("soc-device", "1");
  url.searchParams.set("_reqid", Math.floor(Math.random() * 100000).toString());
  url.searchParams.set("rt", "c");

  // Logic from POC was cleaner:
  // url.searchParams.set('f.sid', auth.sessionId);
  // url.searchParams.set('source-path', sourcePath);

  // Let's reuse the POC logic exactly as it worked!
  const pocUrl = new URL(BATCHEXECUTE_URL);
  pocUrl.searchParams.set("f.sid", auth.sessionId);
  pocUrl.searchParams.set("source-path", sourcePath);

  // Build Payload
  // [[[method, JSON.stringify(params), null, 'generic']]]
  const requestPayload = [[[method, JSON.stringify(params), null, "generic"]]];

  const body = new URLSearchParams({
    "f.req": JSON.stringify(requestPayload),
    at: auth.csrfToken,
  });

  // Headers
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "X-Same-Domain": "1",
  };

  // console.log('📡 RPC Call:', { method, url: pocUrl.toString() });

  // Make request
  const response = await fetch(pocUrl.toString(), {
    method: "POST",
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('RPC Error Body:', errorText.substring(0, 500));
    throw new Error(
      `RPC call failed: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}`
    );
  }

  const rawResponse = await response.text();
  // console.log('📥 Raw response (head):', rawResponse.substring(0, 200));

  // Parse
  // 1. Remove XSSI prefix
  const cleaned = rawResponse.replace(/^\)\]\}'\n/, "");

  // 2. Parse JSON
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error(
      "Failed to parse RPC response JSON",
      cleaned.substring(0, 500),
    );
    throw new Error("Invalid JSON in RPC response");
  }

  // 3. Extract result
  // Response is usually: [[["wXbhsf", "RESULT_STRING", ...], ...]]
  // parsed is the outer array.

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid RPC response format (empty)");
  }

  // The batch execute response is an array of responses.
  // We sent 1 request, so we expect parsed[0] to be valid
  // BUT sometimes it returns multiple envelopes.
  // Let's find the one matching our method id if possible, or just take the first one that looks like a response.
  // Structure: [ [ "wXbhsf", "ResultJSONStr", null, ... ], ... ]

  const wrappedResult = parsed.find(
    (item: any) => Array.isArray(item) && item[0] === method,
  );

  if (!wrappedResult) {
    // Sometimes it's nested differently?
    // In POC we did: const wrappedResult = parsed[0];
    // Let's stick to POC if find fails, or improve robustness.
    // If parsed[0] is our method, use it.
    const first = parsed[0];
    if (Array.isArray(first) && first[0] === method) {
      // It's the one
    } else {
      // console.warn('Could not find exact method match in response, using parsed[0]', parsed);
    }
  }

  // Fallback to parsed[0] for now as per POC
  const envelope =
    parsed.find((item: any) => Array.isArray(item) && item[0] === method) ||
    parsed[0];

  if (!envelope || !Array.isArray(envelope) || envelope.length < 3) {
    console.error("Invalid envelope", envelope);
    throw new Error("Invalid RPC response structure");
  }

  const resultString = envelope[2];

  if (typeof resultString === "string") {
    return JSON.parse(resultString);
  }

  return resultString;
}
