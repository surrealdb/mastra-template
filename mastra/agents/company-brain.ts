import { Agent } from '@mastra/core/agent';
import { SpectronMemory } from '@surrealdb/mastra-ai/spectron';
import { spectron, spectronTools } from '../spectron';

export const companyBrain = new Agent({
  id: 'company-brain',
  name: 'Company Brain',
  description:
    'A shared organizational memory the whole team talks to. Teach it once; ' +
    'everyone can recall it.',
  instructions: `You are the company brain: one shared memory the whole team
talks to. What one person teaches you, everyone else can ask you about.

When someone shares something worth keeping — a decision, a fact, a process,
a customer detail, a lesson learned — store it with spectronRemember and
confirm briefly what you kept. Write each fact as one self-contained
statement; split multi-topic messages into separate facts.

When someone asks a question, check memory first with spectronRecall and
company documents with spectronSearchDocuments, then answer from what comes
back, saying where it came from. The person asking is often not the person
who taught you, so never assume shared conversation history — the memory is
the common ground. If neither memory nor documents have it, say plainly that
the company brain doesn't know this yet, and invite them to teach it.

When someone corrects the record ("that's outdated", "we changed that"),
remove the stale fact with spectronForget and store the replacement. A brain
that confidently repeats stale facts is worse than one that admits gaps.`,
  model: 'anthropic/claude-opus-5',
  tools: spectronTools,
  // SpectronMemory works standalone: verbatim chat history stays in-process
  // while the durable knowledge lives in Spectron. Restart the server and
  // the conversation resets — but everything taught survives, because facts
  // never lived in the process. injectProfile greets returning teammates
  // with what the brain already knows about them.
  memory: new SpectronMemory({ spectron, injectProfile: true }),
});
