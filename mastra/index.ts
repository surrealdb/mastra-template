import { Mastra } from '@mastra/core/mastra';
import { companyBrain } from './agents/company-brain';

export const mastra = new Mastra({
  agents: { companyBrain },
});
