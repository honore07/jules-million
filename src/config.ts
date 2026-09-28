import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, '../.env.local') });
dotenv.config({ path: path.join(__dirname, '../.env') });

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
