import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

export const config = {
  perplexity: {
    apiKey: process.env.PERPLEXITY_API_KEY,
    baseUrl: process.env.PERPLEXITY_API_BASE_URL || 'https://api.perplexity.ai/chat/completions',
    model: process.env.PERPLEXITY_MODEL || 'pplx-7b-online',
  },
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
  },
};

if (!config.perplexity.apiKey) {
  throw new Error('PERPLEXITY_API_KEY environment variable is required');
}

export default config;
