# LinkedIn Agent Service

A microservice that uses Claude Agent SDK with LinkedIn MCP to fetch LinkedIn profile data.

## Architecture

This service runs independently from Convex and exposes an HTTP API that can be called from your Convex actions.

```
Convex Action → HTTP Call → LinkedIn Agent Service → LinkedIn MCP → LinkedIn Profiles
```

## Setup

1. Install dependencies:
```bash
bun install
```

2. Get your LinkedIn session cookie (`li_at`):
   - Log into LinkedIn in your browser
   - Open DevTools (F12)
   - Go to Application → Cookies → https://www.linkedin.com
   - Copy the value of the `li_at` cookie

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` and add:
   - Your `ANTHROPIC_API_KEY`
   - Your `LINKEDIN_SESSION_COOKIE` (li_at value)

5. Make sure Docker is running (required for LinkedIn MCP)

## Running

Development mode (with auto-reload):
```bash
bun dev
```

Production mode:
```bash
bun start
```

## API Endpoints

### POST /fetch-profiles

Fetch LinkedIn profile data for multiple URLs.

**Request:**
```json
{
  "profileUrls": [
    "https://www.linkedin.com/in/example1/",
    "https://www.linkedin.com/in/example2/"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "profiles": [
    {
      "full_name": "John Doe",
      "headline": "Software Engineer at Company",
      "city": "San Francisco",
      "country": "USA",
      "summary": "...",
      "experiences": [...],
      "education": [...],
      "skills": [...],
      "languages": [...],
      "accomplishment_courses": [...]
    },
    ...
  ]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "agentReady": true,
  "timestamp": "2025-10-28T..."
}
```

## Usage from Convex

In your Convex action:

```javascript
const response = await fetch('http://localhost:3002/fetch-profiles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    profileUrls: [
      participant1.linkedinProfile,
      participant2.linkedinProfile
    ]
  })
});

const { profiles } = await response.json();
```
