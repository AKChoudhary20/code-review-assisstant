import { OpenAI } from 'openai';

export class LLMService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  public async analyzeCode(code: string, language: string): Promise<string> {
    if (!code) {
      throw new Error('Code input cannot be empty');
    }

    if (!language) {
      throw new Error('Language must be specified');
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Review this ${language} code for readability, modularity, and potential bugs:\n\n${code}`
          }
        ]
      });

      return response.choices[0].message.content || '';
    } catch (error) {
      console.error('LLM analysis failed:', error);
      throw new Error('Failed to analyze code');
    }
  }
}
