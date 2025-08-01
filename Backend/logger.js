async function getAuthToken() {
  const credentials = {
    email: "22bq1a5472@vvit.net",
    name: "Karavadi S V N S Pavan Kumar",
    rollNo: "22bq1a5472@vvit.net",
    accessCode: "PnVBF",
    clientID: "d050e246-a5de-4fdd-8fe9-aac05d8be92a",
    clientSecret: "WgBuTdnTWUvvQYdB",
  };
  const authUrl = 'http://20.244.56.144/evaluation-service/auth';

  try {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Auth Error: ${errorText}');
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function Log(stack, level, package, message) {
  const token = await getAuthToken();
  if (!token) {
    console.error("Halting log: No auth token.");
    return;
  }

  const logApiUrl = 'http://20.244.56.144/evaluation-service/logs';
  const logData = { stack, level, package, message };

  try {
    const response = await fetch(logApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ${token}',
      },
      body: JSON.stringify(logData),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error('Log API Error: ${errorText}');
    }
    await response.json();
  } catch (error) {
    console.error(error.message);
  }
}
