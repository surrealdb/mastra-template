import { createSpectronTools, Spectron } from '@surrealdb/mastra-ai/spectron';

/**
 * One Spectron client, one context — the company brain. Every teammate's
 * conversations write into it and recall from it. Fact extraction,
 * embeddings, and semantic search all run server-side, so there is no
 * database or vector store to operate here.
 */
export const spectron = new Spectron({
  endpoint: process.env.SPECTRON_ENDPOINT!,
  context: process.env.SPECTRON_CONTEXT!,
  apiKey: process.env.SPECTRON_API_KEY!,
});

/** remember / recall / forget / context / searchDocuments, as Mastra tools. */
export const spectronTools = createSpectronTools(spectron);
