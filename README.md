# CFWorker API

A collection of utility APIs built with Cloudflare Workers, providing various helpful endpoints for common operations.

## Features

- **Time APIs**
  - `/time/zones` - Get list of all available IANA time zones
  - `/time/now` - Get current time in multiple formats

- **UUID Generation**
  - `/uuid?count=N` - Generate N random UUID v4s (default: 1, max: 50) in both lowercase and uppercase formats

- **Health Check**
  - `/health` - API health check status

- **Hash Generation**
  - `/hash` - Generate hash of input text (e.g., `/hash?text=hello&algorithm=sha256`)

- **DNS Lookup**
  - `/dns` - DNS lookup for a domain (e.g., `/dns?domain=google.com&type=A`)

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
GET /uuid?count=<number>
```
Generates one or more random UUID v4s and returns them in lowercase and uppercase formats.

Parameters:
- `count`: Number of UUIDs to generate (default: 1, max: 50)

Example response:
```json
{
  "count": 3,
  "uuids": [
    {
      "uuid_lower": "550e8400-e29b-41d4-a716-446655440000",
      "uuid_upper": "550E8400-E29B-41D4-A716-446655440000"
    },
    {
      "uuid_lower": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "uuid_upper": "6BA7B810-9DAD-11D1-80B4-00C04FD430C8"
    },
    {
      "uuid_lower": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "uuid_upper": "7C9E6679-7425-40DE-944B-E07FC1F90AE7"
    }
  ]
}
```

### Hash Generation
```
GET /hash?text=<text>&algorithm=<algorithm>
```
Generates a hash of the input text using the specified algorithm.

Parameters:
- `text`: The text to hash
- `algorithm`: The hashing algorithm to use (Supported: sha1, sha256 (default), sha384, sha512)

### DNS Lookup
```
GET /dns?domain=<domain>&type=<type>
```
Performs a DNS lookup for the specified domain.

Parameters:
- `domain`: The domain to look up
- `type`: The DNS record type (e.g., A, AAAA, MX)


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
