# CFWorker API

A collection of utility APIs built with Cloudflare Workers, providing various helpful endpoints for common operations.

## Features

- **Time APIs**
  - `/time/zones` - Get list of all available IANA time zones
  - `/time/now` - Get current time in multiple formats

- **UUID Generation**
  - `/uuid` - Generate random UUID v4

- **Health Check**
  - `/health` - API health check status

- **Hash Generation**
  - `/hash` - Generate hash of input text (e.g., `/hash?text=hello&algorithm=sha256`)

- **DNS Lookup**
  - `/dns` - DNS lookup for a domain (e.g., `/dns?domain=google.com&type=A`)

- **Request Echo**
  - `/echo` - Echo back what server sees in the request

- **Location Information**
  - `/location` - Get detailed location information about the caller including country, city, coordinates, and device details

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account (for deployment)

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cfworker-api.git
   cd cfworker-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:8787`

## Deployment

1. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```

2. Deploy the worker:
   ```bash
   npm run deploy
   ```

## API Documentation

### Time APIs

#### Get Time Zones
```
GET /time/zones
```
Returns a list of all available IANA time zones.

#### Get Current Time
```
GET /time/now
```
Returns current time in multiple formats.

### UUID Generation
```
GET /uuid
```
Generates a random UUID v4.

### Health Check
```
GET /health
```
Returns the API health status.

### Hash Generation
```
GET /hash?text=<text>&algorithm=<algorithm>
```
Generates a hash of the input text using the specified algorithm.

Parameters:
- `text`: The text to hash
- `algorithm`: The hashing algorithm to use (e.g., sha256, md5)

### DNS Lookup
```
GET /dns?domain=<domain>&type=<type>
```
Performs a DNS lookup for the specified domain.

Parameters:
- `domain`: The domain to look up
- `type`: The DNS record type (e.g., A, AAAA, MX)

### Request Echo
```
GET /echo
```
Returns all information about the request as seen by the server.

### Location Information
```
GET /location
```
Returns detailed location information about the caller, including:
- IP address
- Country and city
- Geographic coordinates
- Timezone
- Device information
- Browser details
- Network information

## Development

### Project Structure

```
src/
├── api-worker.js      # Main worker entry point
├── handlers/          # Request handlers
├── routes/           # Route configurations
└── utils/            # Utility functions
```

### Adding New Endpoints

1. Create a new handler in `src/handlers/`
2. Add the route configuration in `src/routes/config.js`
3. The endpoint will be automatically available

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
