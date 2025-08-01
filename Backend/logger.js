// Get Token
async function getAuthToken() {
  const credentials = {
    email: "22bq1a5472@vvit.net",
    name: "Karavadi S V N S Pavan Kumar",
    rollNo: "22BQ1A5472",
    accessCode: "PnVBFV",
    clientID: "d050e246-a5de-4fdd-8fe9-aac05d8be92a",
    clientSecret: "WgBuTdnTWUvvQYdB",
  };
  try {
    const res = await fetch('http://20.244.56.144/evaluation-service/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error('Auth Error');
    return data.access_token;
  } catch (error) { return null; }
}

// Logs

async function Log(stack, level, package, message) {
  const token = await getAuthToken();
  if (!token) return;
  try {
    await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ stack, level, package, message }),
    });
  } catch (error) { /* Ignore */ }
}
module.exports = { Log };
