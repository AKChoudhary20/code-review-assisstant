import { LLMService } from '../../src/services/llmService';

// Mock OpenAI to avoid real API calls
jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'Mocked analysis response' } }]
        })
      }
    }
  }))
}));

describe('LLMService', () => {
  let llmService: LLMService;

  beforeEach(() => {
    llmService = new LLMService();
  });

  it('should analyze code and return analysis', async () => {
    const code = 'const a = 1;';
    const language = 'javascript';
    
    const analysis = await llmService.analyzeCode(code, language);
    
    expect(analysis).toBeDefined();
    expect(typeof analysis).toBe('string');
    expect(analysis).toContain('Mocked analysis response');
  });

  it('should handle empty code input', async () => {
    const code = '';
    const language = 'javascript';
    
    await expect(llmService.analyzeCode(code, language))
      .rejects
      .toThrow('Code input cannot be empty');
  });

  it('should handle missing language parameter', async () => {
    const code = 'const a = 1;';
    const language = '';
    
    await expect(llmService.analyzeCode(code, language))
      .rejects
      .toThrow('Language must be specified');
  });
});