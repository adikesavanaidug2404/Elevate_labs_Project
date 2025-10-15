const express = require('express');
const app = express();
const PORT = 8081;

// Simple dashboard + API endpoints for demo features
app.get('/', (req, res) => {
  const html = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Elevate Labs Demo</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial; background:#f6f8fb; color:#222; margin:0; padding:40px; }
      .card { background:#fff; border-radius:10px; padding:24px; max-width:760px; margin:12px auto; box-shadow:0 6px 18px rgba(32,33,36,0.08); }
      h1 { margin:0 0 8px; font-size:20px; }
      p.lead { color:#555; margin:0 0 16px; }
      ul { padding-left:20px; }
      .controls { margin-top:18px; display:flex; gap:8px; flex-wrap:wrap; }
      button { background:#2563eb; color:white; border:0; padding:8px 12px; border-radius:6px; cursor:pointer; }
      button.secondary { background:#6b7280; }
      pre { background:#0f172a; color:#e6edf3; padding:12px; border-radius:6px; overflow:auto; }
      .small { font-size:13px; color:#666; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Elevate Labs — Final Project Demo</h1>
      <p class="lead">Hello, This is from <strong>Adikesava Naidu</strong> — a small demo with a UI, API endpoints and health check.</p>

      <h3>Key features</h3>
      <ul>
        <li>Interactive web UI with inline styles</li>
        <li>JSON feature API at <code>/api/features</code></li>
        <li>Health check endpoint at <code>/health</code></li>
        <li>About route reproducing original message</li>
        <li>Docker-ready (already configured in repository)</li>
      </ul>

      <div class="controls">
        <button id="btn-features">Show features (API)</button>
        <button id="btn-health" class="secondary">Health check</button>
        <button id="btn-about" class="secondary">About</button>
      </div>

      <h3 style="margin-top:18px">Output</h3>
      <div id="output"><pre class="small">Click any button to see output from the server.</pre></div>

      <p class="small" style="margin-top:14px">Server port: ${PORT} — started on ${new Date().toLocaleString()}</p>
    </div>

    <script>
      const out = document.getElementById('output');
      function show(text){ out.innerHTML = '<pre>' + (typeof text === 'object' ? JSON.stringify(text, null, 2) : text) + '</pre>'; }

      document.getElementById('btn-features').addEventListener('click', async () => {
        show('Loading...');
        try{
          const r = await fetch('/api/features');
          const data = await r.json();
          show(data);
        }catch(e){ show('Error: ' + e.message); }
      });

      document.getElementById('btn-health').addEventListener('click', async () => {
        show('Checking...');
        try{
          const r = await fetch('/health');
          const t = await r.text();
          show(t);
        }catch(e){ show('Error: ' + e.message); }
      });

      document.getElementById('btn-about').addEventListener('click', async () => {
        show('Loading about...');
        try{
          const r = await fetch('/about');
          const t = await r.text();
          show(t);
        }catch(e){ show('Error: ' + e.message); }
      });
    </script>
  </body>
  </html>`;

  res.send(html);
});

app.get('/api/features', (req, res) => {
  res.json({
    app: 'Elevate Labs Demo',
    version: '1.0.0',
    updated: new Date().toISOString(),
    features: [
      'Simple web UI',
      'API endpoint /api/features',
      'Health check /health',
      'About route reproducing original message',
      'Docker-ready image & compose'
    ]
  });
});

app.get('/health', (req, res) => res.send('OK'));

app.get('/about', (req, res) => res.send('Hello, This is from Adikesava Naidu regarding Elevate Labs final project 🚀'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
