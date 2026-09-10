# Company Brain with SurrealDB Agent Memory

A shared organizational memory the whole team talks to. What one person
teaches it, everyone can recall — decisions, customer details, tribal
knowledge, the stuff that usually lives in someone's head and leaves when
they do.

Built on [SurrealDB Agent Memory (Spectron)](https://surrealdb.com/spectron),
the hosted memory platform, via
[`@surrealdb/mastra-ai`](https://www.npmjs.com/package/@surrealdb/mastra-ai).
Fact extraction, embeddings, semantic recall, and document search all run
server-side: **there is no database, vector store, or embedding model to
operate**. The agent's process holds nothing durable — restart it and
everything the team taught is still there, because it never lived in the
process.

## What you can try

- Teach it something in one conversation — *"The staging environment resets
  nightly at 02:00"* — then ask about it in a **different thread, as a
  different teammate**. The memory is the common ground, not the chat
  history.
- Ask a policy question — *"Do I need approval for a $150 expense?"* — and
  get an answer grounded in the ingested team FAQ.
- Correct the record — *"We moved the weekly demo to Thursdays"* — and watch
  it forget the stale fact and store the new one.
- Kill the dev server and start it again: fresh process, same brain.

## Quick start

**1. Create the project** (or clone this repo directly)

```bash
npx create-mastra@latest my-company-brain --template template-surrealdb-company-brain
cd my-company-brain && npm install
```

**2. Add your keys**

```bash
cp .env.example .env
```

Set `ANTHROPIC_API_KEY` plus your Spectron credentials — get those at
[surrealdb.com/spectron](https://surrealdb.com/spectron).

**3. Seed and run**

```bash
npm run seed
npm run dev
```

Open Studio at `http://localhost:4111`, pick **Company Brain**, and ask:
*"What did the Northwind renewal call decide?"*

## How it works

```
teammate A ──► ┌───────────────┐        ┌─────────────────────────┐
teammate B ──► │ Company Brain │ ◄────► │ SurrealDB Agent Memory  │
teammate C ──► │    (agent)    │        │ facts · semantic recall │
               └───────────────┘        │ profile · documents     │
                                        └─────────────────────────┘
```

- `src/mastra/agents/company-brain.ts` — the agent. `SpectronMemory` is its
  Mastra memory provider (facts extracted from every turn, server-side), and
  `createSpectronTools` gives it explicit control: `spectronRemember`,
  `spectronRecall`, `spectronForget`, `spectronContext`, and
  `spectronSearchDocuments`.
- `src/mastra/spectron.ts` — the one client and context every conversation
  shares. That single shared context *is* the company brain.
- `scripts/seed.ts` — ingests the sample FAQ into the document corpus and
  plants a few starter facts so the first question has an answer.

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | yes | LLM for the agent |
| `SPECTRON_ENDPOINT` | yes | API endpoint origin |
| `SPECTRON_CONTEXT` | yes | The memory context — one per brain |
| `SPECTRON_API_KEY` | yes | Bearer token |

## Requirements

- Node.js 22.13+
- Spectron credentials ([request access](https://surrealdb.com/spectron))
