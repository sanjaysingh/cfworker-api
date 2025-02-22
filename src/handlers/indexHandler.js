import { htmlResponse } from '../utils/responseHelper'
import { routesConfig } from '../routes/config'

export function handleIndexRequest() {
  // Convert routes object to array of {path, description}
  const apis = Object.entries(routesConfig).map(([path, route]) => ({
    path,
    description: route.description
  }))

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Index</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.6;
        }
        h1 {
          color: #2c3e50;
        }
        a {
          color: #3498db;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>API Index</h1>
      <ul>
        ${apis.map(api => `
          <li>
            <a href="${api.path}">${api.path}</a> - ${api.description}
          </li>
        `).join('')}
      </ul>
    </body>
    </html>
  `

  return htmlResponse(html)
} 