# Roundtable

An AI persona engine for simulating domain experts, thinking through professional lenses, and running autonomous agents. Each persona is built from verified source material — not a generic "act like a CEO" prompt, but a structured cognitive profile with documented decision architecture, values, biases, and communication style.

**The thesis:** most people use LLMs like search engines — ask a question, get an answer. Roundtable uses them like simulators. Load a persona, and the model responds *as* that thinker would — with their frameworks, their blind spots, their specific way of seeing the world. The value isn't the answer. It's getting an answer you wouldn't have thought to ask for.

---

## What It Does

Roundtable loads structured profiles from the filesystem and uses them to construct LLM conversations where the AI responds as that entity. Three kinds:

- **Personas** — Domain expert simulations, each built from 20-35 verified source URLs. Not impersonations — cognitive models. The profile captures how someone *thinks*, not how they talk.
- **Roles** — Professional lenses. Staff engineer, CFO, psychologist, brand designer. Bring domain expertise to any question without building a full persona.
Agents (autonomous workers with triggers and output formats) can also be built using the same profile structure — see the templates directory.

---

## Quick Start

```bash
git clone https://github.com/pauljump/roundtable.git
cd roundtable
npm install

# Set your API key (Anthropic or OpenAI)
export ANTHROPIC_API_KEY=sk-ant-...
# or
export OPENAI_API_KEY=sk-...

# Ask a persona
npx tsx src/cli.ts --persona leverage "Should I raise money or bootstrap?"

# Ask a role
npx tsx src/cli.ts --role staff-eng "Review this architecture for a real-time notification system"

# Interactive mode (multi-turn conversation)
npx tsx src/cli.ts --persona founder

# List all available entities
npx tsx src/cli.ts --list
```

---

## How Personas Work

Each persona is a directory containing a `profile.md` with 8 structured sections:

```
personas/
  leverage/
    profile.md          ← cognitive profile (8 sections)
    context/            ← optional world files (essays, data)
  founder/
    profile.md
  ...
```

### The 8-Section Schema

1. **Identity & Self-Narrative** — How this person sees themselves. The story they tell.
2. **Decision Architecture** — Risk tolerance, information appetite, time horizon, decision speed.
3. **Values Hierarchy** — What they optimize for, ranked. What they'd sacrifice and what they won't.
4. **Operating Heuristics** — Rules of thumb. The shortcuts they use under uncertainty.
5. **Cognitive Biases** — Where their thinking breaks. Not self-reported — externally analyzed.
6. **Narrative Gap** — The difference between their self-story and how others experience them.
7. **Communication Style** — How they talk, argue, persuade. Verbal tics, rhetorical patterns.
8. **Evaluation Lens** — What they look for when evaluating an idea. What makes them say yes or no.

The cognitive biases and narrative gap sections are what make this different from a generic prompt. A persona that only contains self-reported strengths is a press release, not a simulation.

---

## The Idea Evaluation Pipeline

The most powerful use of Roundtable is as a multi-agent evaluation panel. Instead of asking one AI "is this a good idea?", you run the idea through multiple adversarial personas:

```
Idea enters pipeline
  → 3 personas evaluate independently (2/3 must advance)
  → Domain-specific pairs go deeper (strategy + economics, growth + UX)
  → Surviving ideas get structured analysis
```

**199 ideas** have been evaluated through this pipeline. **47 advanced. 101 killed.** The kill rate is the feature — a panel that advances everything is worthless.

The personas don't agree with each other. A Leverage Thinker evaluates ideas through compounding and asymmetric upside. A Scope Enforcer asks "what's the smallest version that proves anything?" An Operations Executive asks "who does the work on day one?" An Economics Analyst asks "what are the unit economics at scale?" Running an idea through all four produces tension — and the tension is where the insight lives.

---

## Available Personas (16)

| Name | Lens | What They Evaluate For |
|------|------|----------------------|
| `leverage` | Leverage, specific knowledge, compounding | Asymmetric upside, permissionless scale |
| `founder` | Organic ideas, schlep, doing things that don't scale | Is this solving a real problem? Would the founder do the schlep? |
| `ops-execution` | Operations, supply side, day-one playbook | Who does the work? What breaks at scale? |
| `growth` | Growth loops, cold start, retention, distribution | How does this grow without paid acquisition? |
| `economics` | Revenue quality, unit economics, take rates | Does the math work? What are the real margins? |
| `contrarian` | Monopoly, secrets, 10x better | Is this a real secret? Or an obvious idea everyone will copy? |
| `aggregation` | Value chains, aggregation, platform dynamics | Where's the power? Who captures the value? |
| `experience` | 11-star experience, design-led, belonging | What does the 10x version feel like? |
| `scope` | Ruthless MVP scope, LNO, pre-mortems | What's the smallest thing that proves anything? |
| `design` | UX quality, obviousness, design craft | Is this obvious to use? Where's the friction? |
| `mission` | Mission weight, conviction, pain tolerance | Is the founder's connection to this problem real? |
| `builder` | Infrastructure, developer tools, scaling systems | Is the architecture right? What are the platform bets? |
| `techvision` | Tech optimism, platform shifts | Is this riding a wave or fighting one? |
| `pricing` | Consumer willingness to pay, price reality | Will people actually pay this? What's the reference price? |
| `mediator` | Conflict resolution, finding hidden agreement | Where do these disagreeing perspectives actually agree? |
| `ops-systems` | Operational frameworks, supply-side strategy | How do you launch city by city? What's the playbook? |

Each persona is built from 20-35 verified source URLs — essays, interviews, books, talks. The profile captures the source material's actual frameworks, not a summary.

---

## Available Roles (11)

| Name | Perspective |
|------|------------|
| `staff-eng` | Senior IC engineering judgment — architecture, tradeoffs, tech debt |
| `product-manager` | Product strategy, prioritization, user stories |
| `engineering-manager` | Team health, delivery, process |
| `principal-eng-google` | Systems design at hyperscale |
| `principal-eng-tesla` | Hardware-software integration, embedded systems |
| `cfo` | Financial strategy, burn rate, fundraising |
| `brand-designer` | Brand identity, visual systems, positioning |
| `copywriter` | Messaging, tone, positioning |
| `psychologist` | Cognitive-behavioral frameworks, user motivation |
| `signal-scout` | Capability matching — maps signals to existing tools |
| `domain-classifier` | Categorization and taxonomy |

---

## Programmatic API

```typescript
import { loadEntity, buildSystemPrompt, listAll } from "roundtable";

// Load a persona and get the system prompt
const entity = loadEntity("persona", "economics");
const systemPrompt = buildSystemPrompt(entity);

// Pass systemPrompt to any LLM client as the system message
// Works with Anthropic, OpenAI, or any provider
```

---

## Creating Your Own Personas

```bash
# Copy the template
cp templates/profile-template.md personas/your-expert/profile.md

# Edit the profile with your expert's cognitive model
# Source everything — every claim should trace to public material

# Test it
npx tsx src/cli.ts --persona your-expert "What do you think about X?"
```

### Rules for Good Personas

1. **Source everything.** Every claim in the profile should trace to public material. Unsourced claims become hallucination bait.
2. **Include the Narrative Gap.** The difference between how someone sees themselves and how others see them is where the interesting simulation happens.
3. **Include Cognitive Biases.** Not self-reported strengths — externally analyzed weaknesses. A persona without biases is a press release.
4. **Be specific about decision architecture.** "Likes bold bets" is useless. "Takes asymmetric bets with capped downside and unbounded upside, rejects linear time-for-money trades" is simulatable.

---

## Architecture

```
roundtable/
├── src/
│   ├── index.ts        ← clean exports (loadEntity, listAll, buildSystemPrompt)
│   ├── engine.ts       ← core logic: load entities, build system prompts
│   ├── cli.ts          ← interactive CLI (Anthropic + OpenAI)
│   └── types.ts        ← EntityKind, RoundtableEntity, AskOptions
├── personas/           ← 16 cognitive profiles
├── roles/              ← 11 professional lenses
└── templates/          ← scaffolds for creating new entities
```

The engine is ~120 lines of TypeScript. The value is in the profiles, not the code.

---

## Why This Exists

Most AI "persona" implementations are one-paragraph system prompts: "You are a helpful marketing expert." That produces generic, agreeable, useless output. It's the AI equivalent of asking "what do you think?" at a dinner party — you get polite nothing.

Roundtable personas are adversarial, opinionated, and specific. They disagree with each other. They have blind spots. They have frameworks that work brilliantly in some domains and fail in others. Running an idea through three of them produces the kind of tension that a real advisory board would — where the disagreement is more valuable than the agreement.

The evaluation pipeline emerged from a practical need: 199 ideas needed to be filtered down to the ones worth building. Asking one AI model "is this good?" produces yes 90% of the time. Asking three personas with different frameworks produces genuine signal — and a 51% kill rate.

---

## Related

- **[AI Factory](https://github.com/pauljump/ai-factory)** — The production system where Roundtable was born. 21 shared packages, 16 playbooks, idea-to-deployed in one session.
- **[agentspawn](https://github.com/pauljump/agentspawn)** — Psychology-grounded framework for AI agent first interactions. 10 principles from developmental psychology, 18 personality archetypes.
- **[findthemoney](https://github.com/pauljump/findthemoney)** — How NYC's budget actually works. Framework for tracing public dollars without double-counting.

---

**Author:** Paul Jump
**License:** MIT
