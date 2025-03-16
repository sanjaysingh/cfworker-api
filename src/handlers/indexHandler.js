import { htmlResponse } from '../utils/responseHelper'
import { routesConfig } from '../routes/config'

export function handleIndexRequest() {
  // Convert routes object to array of {path, description, example}, excluding root path
  const apis = Object.entries(routesConfig)
    .filter(([path]) => path !== '/') // Filter out the root path
    .map(([path, route]) => ({
      path,
      description: route.description,
      example: route.example
    }))

  // Generate HTML for each API card
  const apisHtml = apis.map(api => {
    const targetUrl = api.example ? api.example.url : api.path;
    const description = api.description + (api.example ? ` Example: <a href="${api.example.url}">${api.example.description}</a>` : '');
    
    return `
    <div class="api-card">
      <a href="${targetUrl}" class="api-path">${api.path}</a>
      <p class="api-description">${description}</p>
      <a href="${targetUrl}" class="badge">GET</a>
    </div>
    `;
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Utility API</title>
  <style>
    :root {
      --primary-color: #2563eb;
      --primary-hover: #1d4ed8;
      --bg-color: #f8fafc;
      --card-bg: #ffffff;
      --text-color: #1e293b;
      --text-secondary: #64748b;
      --border-color: #e2e8f0;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem 0;
    }

    h1 {
      font-size: 2.5rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
      font-weight: 800;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .api-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .api-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid var(--border-color);
    }

    .api-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    .api-path {
      color: var(--primary-color);
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      display: block;
      text-decoration: none;
    }

    .api-path:hover {
      text-decoration: underline;
    }

    .api-description {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }

    .api-description a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
    }

    .api-description a:hover {
      text-decoration: underline;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: #e0f2fe;
      color: #0369a1;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 1rem;
      text-decoration: none;
      transition: background-color 0.2s;
    }

    .badge:hover {
      background-color: #bae6fd;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      header {
        margin-bottom: 2rem;
        padding: 1.5rem 0;
      }

      h1 {
        font-size: 2rem;
      }

      .api-grid {
        grid-template-columns: 1fr;
      }

      .api-card {
        padding: 1.25rem;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-color: #0f172a;
        --card-bg: #1e293b;
        --text-color: #f1f5f9;
        --text-secondary: #94a3b8;
        --border-color: #334155;
      }

      .badge {
        background-color: #1e3a8a;
        color: #bfdbfe;
      }

      .badge:hover {
        background-color: #2563eb;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Utility APIs</h1>
      <p class="subtitle">A collection of utility APIs built with Cloudflare Workers, providing various helpful endpoints for common operations.</p>
    </header>

    <div class="api-grid">
      ${apisHtml}
    </div>
  </div>
</body>
</html>`

  return htmlResponse(html)
} 