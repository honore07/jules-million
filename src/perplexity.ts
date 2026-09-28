import axios from 'axios';
import config from './config';

interface PerplexityMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: Array<{
    index: number;
    message: PerplexityMessage;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class PerplexityClient {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = config.perplexity.apiKey;
    this.baseUrl = config.perplexity.baseUrl;
    this.model = config.perplexity.model;
  }

  async query(prompt: string, conversationHistory: PerplexityMessage[] = []): Promise<string> {
    const messages: PerplexityMessage[] = [
      ...conversationHistory,
      { role: 'user', content: prompt },
    ];

    try {
      const response = await axios.post<PerplexityResponse>(
        this.baseUrl,
        {
          model: this.model,
          messages: messages,
          temperature: 0.7,
          top_p: 0.9,
          return_citations: true,
          search_domain_filter: ['perplexity.ai'],
          search_recency_filter: 'month',
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const assistantMessage = response.data.choices[0]?.message?.content;
      if (!assistantMessage) {
        throw new Error('No response from Perplexity API');
      }

      return assistantMessage;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Perplexity API error: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}

export const perplexity = new PerplexityClient();
