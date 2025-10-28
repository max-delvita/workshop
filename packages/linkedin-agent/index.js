import express from 'express';
import cors from 'cors';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import Anthropic from '@anthropic-ai/sdk';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize MCP client and Anthropic
let mcpClient;
let anthropicClient;

async function initializeClients() {
  try {
    // Initialize Anthropic client
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });

    // Start LinkedIn MCP server via Docker
    const transport = new StdioClientTransport({
      command: 'docker',
      args: [
        'run',
        '--rm',
        '-i',
        '-e', `LINKEDIN_COOKIE=${process.env.LINKEDIN_SESSION_COOKIE}`,
        'stickerdaniel/linkedin-mcp-server'
      ]
    });

    mcpClient = new Client({
      name: 'linkedin-agent-service',
      version: '1.0.0'
    }, {
      capabilities: {}
    });

    await mcpClient.connect(transport);
    console.log('✓ MCP client connected to LinkedIn server');
    console.log('✓ Anthropic client initialized');

  } catch (error) {
    console.error('Failed to initialize clients:', error);
    throw error;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mcpConnected: mcpClient != null,
    anthropicReady: !!anthropicClient,
    timestamp: new Date().toISOString()
  });
});

// Fetch LinkedIn profiles endpoint
app.post('/fetch-profiles', async (req, res) => {
  try {
    const { profileUrls } = req.body;

    if (!profileUrls || !Array.isArray(profileUrls) || profileUrls.length === 0) {
      return res.status(400).json({
        error: 'profileUrls array is required'
      });
    }

    if (!mcpClient) {
      return res.status(503).json({
        error: 'MCP client not initialized'
      });
    }

    console.log(`Fetching ${profileUrls.length} LinkedIn profiles...`);

    const profiles = [];

    for (const url of profileUrls) {
      try {
        // Extract LinkedIn username from URL
        let username = url;

        // Check if it's a valid LinkedIn URL
        const linkedinMatch = url.match(/linkedin\.com\/in\/([^\/]+)/);
        if (linkedinMatch) {
          username = linkedinMatch[1];
        } else {
          console.warn(`Invalid LinkedIn URL format: ${url}`);
          profiles.push(null);
          continue;
        }

        console.log(`Calling MCP get_person_profile for username: ${username}`);

        // Call the get_person_profile tool from LinkedIn MCP
        const result = await mcpClient.callTool({
          name: 'get_person_profile',
          arguments: {
            linkedin_username: username
          }
        });

        console.log(`MCP result for ${url}:`, JSON.stringify(result, null, 2));

        // The result contains the profile data
        if (result.content && result.content.length > 0) {
          const profileText = result.content[0].text;
          console.log(`Profile text length: ${profileText?.length || 0} characters`);

          // Parse the profile data (MCP returns structured data)
          try {
            const profileData = JSON.parse(profileText);
            profiles.push(profileData);
          } catch {
            // If not JSON, use Claude to structure the data
            const message = await anthropicClient.messages.create({
              model: 'claude-sonnet-4-20250514',
              max_tokens: 4096,
              messages: [{
                role: 'user',
                content: `Convert this LinkedIn profile data into the following JSON format:
{
  "full_name": "...",
  "headline": "...",
  "city": "...",
  "country": "...",
  "summary": "...",
  "experiences": [
    {
      "title": "...",
      "company": "...",
      "starts_at": { "year": ... },
      "ends_at": { "year": ... }
    }
  ],
  "education": [
    {
      "school": "...",
      "degree_name": "...",
      "field_of_study": "...",
      "starts_at": { "year": ... },
      "ends_at": { "year": ... }
    }
  ],
  "skills": ["...", "..."],
  "languages": ["...", "..."],
  "accomplishment_courses": [
    { "name": "..." }
  ]
}

Profile data:
${profileText}

Return ONLY the JSON, no other text.`
              }]
            });

            const jsonText = message.content[0].text;
            const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              profiles.push(JSON.parse(jsonMatch[0]));
            } else {
              profiles.push(null);
            }
          }
        } else {
          console.warn(`No data returned for profile: ${url}`);
          profiles.push(null);
        }
      } catch (error) {
        console.error(`Error fetching profile ${url}:`, error.message || error);
        console.error(`Full error:`, JSON.stringify(error, null, 2));
        profiles.push(null);
      }
    }

    const successCount = profiles.filter(p => p).length;
    console.log(`✓ Successfully fetched ${successCount}/${profileUrls.length} profiles`);

    res.json({
      success: true,
      profiles
    });

  } catch (error) {
    console.error('Error in /fetch-profiles:', error);
    res.status(500).json({
      error: 'Failed to fetch LinkedIn profiles',
      message: error.message
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  if (mcpClient) {
    await mcpClient.close();
  }
  process.exit(0);
});

// Start server
async function start() {
  try {
    await initializeClients();
    app.listen(PORT, () => {
      console.log(`\n🚀 LinkedIn Agent Service running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 Endpoint: POST http://localhost:${PORT}/fetch-profiles\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
