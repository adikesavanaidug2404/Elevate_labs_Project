const express = require("express");
const os = require("os");
const app = express();
const PORT = 8081;

// --- ROUTES --- //
app.get("/", (req, res) => {
  const html = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Elevate Labs Dashboard</title>
    <style>
      :root {
        --primary: #2563eb;
        --secondary: #6b7280;
        --bg: #f9fafb;
        --card-bg: #ffffff;
        --text: #1e293b;
        --accent: #10b981;
      }
      body.dark {
        --bg: #0f172a;
        --card-bg: #1e293b;
        --text: #f1f5f9;
      }
      body {
        font-family: 'Segoe UI', Roboto, Arial;
        background: var(--bg);
        color: var(--text);
        margin: 0;
        padding: 40px;
        transition: background 0.3s, color 0.3s;
      }
      header {
        text-align: center;
        padding: 24px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        color: white;
        border-radius: 12px;
        margin-bottom: 32px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.15);
      }
      header h1 { margin: 0; font-size: 26px; }
      header p { margin: 4px 0 0; font-size: 14px; opacity: 0.9; }
      .card {
        background: var(--card-bg);
        border-radius: 12px;
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        transition: background 0.3s;
      }
      h3 { margin-top: 20px; }
      ul { padding-left: 20px; }
      .controls {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
      }
      button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.25s ease;
      }
      button:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
      button.secondary { background: var(--secondary); }
      button.accent { background: var(--accent); }
      .mode-toggle {
        position: absolute;
        top: 18px;
        right: 30px;
        background: transparent;
        border: 2px solid white;
        border-radius: 20px;
        padding: 6px 14px;
        font-size: 13px;
        color: white;
        cursor: pointer;
      }
      pre {
        background: #0f172a;
        color: #e2e8f0;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
      }
      footer {
        text-align: center;
        margin-top: 32px;
        font-size: 13px;
        color: var(--secondary);
      }
    </style>
  </head>
  <body>
    <header>
      <h1>🚀 Elevate Labs Dashboard</h1>
      <p>By <strong>Adikesava Naidu</strong> — Interactive Node.js App Demo</p>
      <button class="mode-toggle" id="modeToggle">Dark Mode</button>
    </header>

    <div class="card">
      <h3>✨ Key Features</h3>
      <ul>
        <li>Modern responsive web UI with light/dark mode</li>
        <li>JSON feature API at <code>/api/features</code></li>
        <li>Health check endpoint at <code>/health</code></li>
        <li>About route with project intro</li>
        <li>Server info endpoint (<code>/api/server-info</code>)</li>
        <li>Docker-ready (included in repo)</li>
      </ul>

      <div class="controls">
        <button id="btn-features">Features API</button>
        <button id="btn-health" class="secondary">Health Check</button>
        <button id="btn-about" class="secondary">About</button>
        <button id="btn-server" class="accent">Server Info</button>
      </div>

      <h3 style="margin-top:20px;">🧭 Output</h3>
      <div id="output"><pre>Click any button to view real-time results from the server.</pre></div>
    </div>

    <footer>
      Server running on port ${PORT} — started ${new Date().toLocaleString()}
    </footer>

    <script>
      const out = document.getElementById('output');
      const modeBtn = document.getElementById('modeToggle');
      const body = document.body;

      function show(data) {
        out.innerHTML = '<pre>' + (typeof data === 'object' ? JSON.stringify(data, null, 2) : data) + '</pre>';
      }

      async function fetchAndShow(url, isJson = true) {
        show('Loading...');
        try {
          const r = await fetch(url);
          const d = isJson ? await r.json() : await r.text();
          show(d);
        } catch (err) {
          show('Error: ' + err.message);
        }
      }

      document.getElementById('btn-features').onclick = () => fetchAndShow('/api/features');
      document.getElementById('btn-health').onclick = () => fetchAndShow('/health', false);
      document.getElementById('btn-about').onclick = () => fetchAndShow('/about', false);
      document.getElementById('btn-server').onclick = () => fetchAndShow('/api/server-info');

      modeBtn.onclick = () => {
        body.classList.toggle('dark');
        modeBtn.textContent = body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
      };
    </script>
  </body>
  </html>`;

  res.send(html);
});

app.get("/api/features", (req, res) => {
  res.json({
    app: "Elevate Labs Demo",
    version: "2.0.0",
    updated: new Date().toISOString(),
    features: [
      "Modern UI with dark/light mode",
      "Feature API endpoint /api/features",
      "Health check /health",
      "About route /about",
      "Server info /api/server-info",
      "Docker-ready deployment"
    ]
  });
});

app.get("/health", (req, res) => res.send("✅ Server is healthy and running fine!"));
app.get("/about", (req, res) => res.send("👋 Hello, this is Adikesava Naidu — Elevate Labs final project demo with Node.js and Express!"));

app.get("/api/server-info", (req, res) => {
  const uptime = process.uptime();
  const memory = process.memoryUsage();
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: Math.round(uptime) + " seconds",
    memory: {
      rss: (memory.rss / 1024 / 1024).toFixed(2) + " MB",
      heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + " MB"
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
