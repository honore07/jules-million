import express, { Request, Response } from 'express';
import config from './config';
import { perplexity } from './perplexity';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Jules Million MVP - Perplexity Integration',
    status: 'running',
    environment: config.app.env,
  });
});

app.post('/api/query', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Invalid prompt provided' });
      return;
    }

    const response = await perplexity.query(prompt);
    res.json({
      prompt,
      response,
      model: config.perplexity.model,
    });
  } catch (error) {
    console.error('Error in /api/query:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

app.listen(config.app.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.app.port}`);
  console.log(`📡 Using Perplexity model: ${config.perplexity.model}`);
  console.log(`🔧 Environment: ${config.app.env}`);
});
