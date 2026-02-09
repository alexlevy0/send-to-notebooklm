// public/popup-test.js
import { getAuthTokens } from './lib/auth.js';
import { rpcCall } from './lib/rpc.js';
import { RPCMethod } from './lib/rpc-methods.js';

document.getElementById('testBtn').addEventListener('click', async () => {
  const result = document.getElementById('result');
  result.textContent = 'Loading... Check console for details.';

  try {
    // Test auth
    result.textContent += '\n🔄 Authenticating...';
    const auth = await getAuthTokens();
    result.textContent += '\n✅ Auth OK';
    result.textContent += `\n   CSRF: ${auth.csrfToken.substring(0, 10)}...`;
    result.textContent += `\n   Session: ${auth.sessionId.substring(0, 10)}...`;

    // Test LIST_NOTEBOOKS
    result.textContent += '\n\n🔄 Fetching notebooks...';
    const params = [null, null, null];
    const notebooks = await rpcCall(RPCMethod.LIST_NOTEBOOKS, params, auth, '/');
    
    result.textContent += '\n✅ LIST_NOTEBOOKS OK\n';
    
    // Correct parsing based on observed JSON
    // notebooks = [ [ [nb1], [nb2], ... ] ]
    const nbList = notebooks[0];
    
    if (Array.isArray(nbList)) {
        result.textContent += `Found ${nbList.length} notebooks:\n`;
        nbList.forEach(nb => {
            const title = nb[0];
            const id = nb[2];
            result.textContent += `- ${title} (ID: ${id})\n`;
        });
    } else {
        result.textContent += 'Unexpected format: notebooks[0] is not an array.\n';
        result.textContent += JSON.stringify(notebooks, null, 2);
    }

  } catch (error) {
    result.textContent += '\n\n❌ Error: ' + error.message;
    console.error(error);
  }
});
