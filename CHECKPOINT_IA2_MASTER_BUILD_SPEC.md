# CHECKPOINT — IA 2 PROTOTYPE MASTER BUILD SPEC
## Claude Code Handoff — Full Frontend Prototype Specification

**Project:** Checkpoint  
**Working name:** Checkpoint  
**Assessment:** IA 2 — Prototype and Pitch  
**Primary build goal:** A coherent, clickable, presentation-ready prototype that demonstrates the legal-change monitoring workflow end to end.  
**Audience for this file:** Claude Code / frontend developer  
**Data policy:** Fake/demo data only. Never use real company, customer, employee, confidential, personal, or case data.  
**Current date/context:** October 2026

---

# 0. READ THIS FIRST — NON-NEGOTIABLE SCOPE

This document is the **master build specification** for the Checkpoint IA 2 prototype.

The most important instruction is:

> **Build a coherent working prototype, not a production enterprise platform.**

The professor's IA 2 expectations are about demonstrating that the solution responds clearly to the problem identified in IA 1, that the screens form a complete workflow, and that another person can understand how the intended product operates.

The prototype does **not** need to be deployment-ready.

## 0.1 What must be demonstrated

The core story is:

> **Engineering submits a product change → Checkpoint compares it with the facts behind an earlier Legal approval → Checkpoint identifies a potentially material change → Magfi, Junior Counsel, reviews the difference → Magfi makes the legal decision → the decision is sent back to Engineering → the action is recorded.**

The prototype must make this story visually and interactively obvious.

## 0.2 IA 2 scope decision

For this build:

### IN SCOPE
- Frontend/web prototype
- Clickable navigation
- Browser/local in-memory state
- Fake data
- Working form interactions
- Working filters
- Working project navigation
- Working flag review
- Working legal decision flow
- Working ticket/comprehensive-review flow
- Working response-to-team flow
- Working AI Brief tab
- Working AI Tracking demonstration
- Reset demo
- Consistent state transitions
- Presentation-quality UI
- One complete end-to-end demo path
- Supporting scenarios for no-flag, later, resolved, and tracking cases

### NOT REQUIRED FOR IA 2
- Production backend
- PostgreSQL
- Prisma
- Real authentication
- Real user accounts
- Real Slack API
- Real Jira API
- Real AI API
- Real LLM inference
- Real document parsing
- Real file uploads
- Real ticket creation
- Production authorization
- Production encryption/security infrastructure
- Production deployment architecture
- Enterprise SSO
- Production monitoring
- Production data retention system
- Actual legal automation

If a future architecture document mentions these, treat them as **future implementation possibilities**, not requirements for this prototype.

## 0.3 Do not overbuild

Do not spend time building infrastructure that cannot be demonstrated during the IA 2 presentation.

Do not turn this into a generic AI dashboard.

Do not add unrelated features merely because they are technically interesting.

Do not add:
- analytics dashboards
- chatbots
- AI chat
- user management
- billing
- real integrations
- generic settings pages
- unnecessary onboarding
- extra navigation
- unrelated notifications
- extra legal categories
- additional workflow states not specified here

unless explicitly required by this document.

---

# 1. PROJECT CONTEXT

Checkpoint is a fictional legal-tech product modeled around a Figma-like company environment.

It is **not Figma**, is not affiliated with Figma, and is not a Figma plugin.

The scenario is for a law-school elective and uses fictional data.

The problem comes from the General Counsel/legal-team context:

A lawyer reviews and approves an AI feature based on specific facts.

Examples of facts Legal may rely on:
- which AI provider is used
- whether customer data is used for training
- how long data is retained
- which regions the feature is launched in
- which data categories are processed
- whether an AI capability is on/off by default
- what source content is used

The product continues changing after the original legal review.

A team may make a change that looks technically minor but changes one of the facts Legal originally relied on.

The existing workflow can therefore become stale.

Checkpoint is intended to create a connection between:

**Legal approval facts ↔ later product changes**

so that potentially material changes return to Legal for human review.

---

# 2. PROBLEM STATEMENT

Use this refined problem statement as the conceptual foundation:

> **How might we connect legal counsel to the information currently scattered across departments; give them a reliable filter for which product changes are legally material enough to require re-review; and turn each review's facts, conditions, and owners into a living record so that legal review of AI-enabled features stays current, traceable, and enforceable throughout the product's lifecycle, not just at launch?**

## 2.1 Root problem

Legal approval is effectively a one-time gate.

The approval is based on facts.

Later, Product, Engineering, or Design changes those facts.

There is no reliable workflow that automatically brings potentially material changes back to Legal.

The lawyer may therefore discover the mismatch only after launch or after a problem occurs.

## 2.2 What Checkpoint changes

Checkpoint creates a review loop:

1. A team submits a planned change.
2. Checkpoint associates it with a project.
3. The project contains the facts previously approved by Legal.
4. The submitted change is compared with those facts.
5. Potentially material differences are surfaced as flags.
6. Legal reviews the flag.
7. Legal decides what happens.
8. The response is returned to the submitting team.
9. The action is represented in an audit trail.

The system assists with **finding and organizing potential changes**.

It does not make the legal decision.

---

# 3. PRIMARY USER

## Magfi — Junior Counsel

Magfi is the primary user of the Legal side.

Her problem is not that she cannot perform legal analysis.

Her problem is that the current workflow may fail to bring her back into the loop when the product changes.

The interface should therefore help Magfi answer:

1. What changed?
2. Which project does it affect?
3. Which previously approved fact does it differ from?
4. Why might that matter?
5. Which legal artefact should I check?
6. What decision do I want to send back?
7. Has the outcome been recorded?

The UI should reduce cognitive load rather than overwhelm Magfi with AI language.

---

# 4. OTHER USERS

## Engineering
Submits technical/product changes.

## Product Management
Submits product and rollout changes.

## Design
Submits design or UX changes.

These teams should not be asked to decide whether something is legally material.

They simply describe the planned change.

---

# 5. CORE DESIGN PRINCIPLES

## 5.1 Human in the loop

The system never makes the final legal decision.

Use the exact legal-review notice where specified:

> **This needs your review. The agent can't act on it automatically.**

## 5.2 Read-only agent

The conceptual agent:
- reads submitted information
- compares it
- surfaces a possible issue
- suggests the relevant artefact

It does not:
- approve
- block
- post
- edit
- send external communications
- create a real ticket without human confirmation

## 5.3 Explicit submission

For the prototype, the formal workflow begins with a team submitting a change document.

The Slack/Jira tracking view is a separate illustrative feature.

A tracked Slack/Jira item must **never automatically become a legal flag**.

The flow is:

**Possible change spotted → Not submitted → Ask team to submit document → Team submits document → formal analysis → possible legal flag**

## 5.4 Fake data only

Everything in the prototype is fictional.

Do not upload real:
- contracts
- customer data
- employee messages
- personal data
- legal matters
- confidential company documents

---

# 6. IA 2 EXPERIENCE REQUIREMENTS

The prototype must satisfy the instructor's expectations:

## 6.1 Working/clickable representation

A person unfamiliar with the project should be able to click through the prototype and understand:
- what the user does
- what the system does
- what the system shows
- what the user decides
- what happens after the decision

## 6.2 Coherent workflow

Screens cannot exist as disconnected mockups.

The core path must work from beginning to end.

## 6.3 Demo requirement

The live demo should focus on **one meaningful workflow**.

Recommended demo:

> Project A → Engineering submits Chatbot cost reduction v2 → Checkpoint flags Vendor Change → Magfi reviews → Magfi chooses an outcome → Engineering receives the response.

The demo should not attempt to demonstrate every screen.

Other scenarios exist to prove that the prototype is not only a single hardcoded happy path.

---

# 7. CORE CATEGORIES

Checkpoint uses seven legal-change categories:

1. **Vendor change**
2. **Data kept longer**
3. **Training**
4. **Default setting**
5. **Generated content**
6. **Data category**
7. **Jurisdiction**

These are prototype categories.

## 7.1 Urgency

For the prototype:

### Urgent
- Vendor change
- Training
- Jurisdiction

### Later
- Data kept longer
- Default setting
- Generated content
- Data category

Do not invent additional urgency rules.

---

# 8. PROJECTS

Use exactly these initial projects.

| ID | Project | Subtitle | People | Avatars | Default team | Feature |
|---|---|---|---:|---|---|---|
| A | Customer-facing support chatbot | Customer-facing support chatbot | 5 | EN PM DS +2 | Engineering | Support chatbot |
| B | Onboarding and welcome flow | Onboarding and welcome flow | 3 | EN SM +1 | Design | Onboarding flow |
| C | Regional rollout of AI features | Regional rollout of AI features | 4 | PM DS +2 | Product management | Regional rollout |
| D | AI summaries of workshop boards | AI summaries of workshop boards | 4 | PM EN +2 | Product management | AI board summaries |
| E | AI image creation inside the editor | AI image creation inside the editor | 3 | DS EN +1 | Product management | AI image creation |

Total people shown on Home: **19**.

---

# 9. SAMPLE CHANGE DOCUMENTS

## Project A

**Document title:** Chatbot cost reduction v2

**Short summary:**

> Moving the support chatbot to a cheaper AI model from a different provider. No change to the screens. Customer chat messages will be sent to the new provider.

## Project B

**Document title:** Onboarding copy changes

**Short summary:**

> Updating the wording of the welcome message. No change to how the product works or what data is used.

## Project C

**Document title:** EU rollout plan

**Short summary:**

> Launching the AI feature to customers in a new region next month. No change to how the feature works.

## Project D

**Document title:** Summary quality plan

**Short summary:**

> Using customer boards to improve how well the AI summaries work. No change to the screens.

## Project E

**Document title:** Image feature launch plan

**Short summary:**

> Switching the AI image feature on by default for every plan from next month.

---

# 10. STARTING DATA

## 10.1 Live flags — six at initial load

Order: urgent first, then later.

| # | Title | Project | Team | Document | Feature | Category | Urgency | Date |
|---|---|---|---|---|---|---|---|---|
| 1 | Feature to launch in a new region | C | Product management | EU rollout plan | Regional rollout | Jurisdiction | urgent | 30 Sep |
| 2 | Customer boards used to improve the summary model | D | Product management | Summary quality plan | AI board summaries | Training | urgent | 27 Sep |
| 3 | Purchase history added to chatbot input | A | Product management | Personalisation spec | Support chatbot | Data category | later | 29 Sep |
| 4 | AI request logs kept for longer to help debugging | D | Engineering | Debugging and logs update | AI board summaries | Data kept longer | later | 26 Sep |
| 5 | AI image feature switched on by default for all plans | E | Product management | Image feature launch plan | AI image creation | Default setting | later | 25 Sep |
| 6 | Image feature adds styles built from public template files | E | Design | Style library update | AI image creation | Generated content | later | 24 Sep |

Each starts with status:

**Awaiting your review**

---

# 11. RESOLVED STARTING DATA

Three resolved items.

Each displays:

**Sent back to [team] · [outcome] · [date]**

### Resolved 1
- New AI provider added for image captions
- Project E
- Design
- Caption model trial
- AI image creation
- Vendor change
- Changes required
- 2 Oct

### Resolved 2
- Chatbot memory setting changed
- Project A
- Engineering
- Chatbot memory setting
- Support chatbot
- Default setting
- Approved, go ahead
- 1 Oct

### Resolved 3
- Onboarding tips built from usage data
- Project B
- Product management
- Onboarding tips from usage
- Onboarding flow
- Training
- Changes required
- 28 Sep

---

# 12. LOGGED / NO-FLAG STARTING DATA

Two items:

### Logged item 1
- Welcome message wording updated
- Project B
- Design
- Onboarding copy changes
- Onboarding flow
- No legal category
- Logged, no flag
- Non-legal

### Logged item 2
- Button colour updated
- Project A
- Design
- Button style refresh
- Support chatbot
- No legal category
- Logged, no flag
- Non-legal

### Important consistency rule

The "Welcome message wording updated" item is **logged/no-flag**.

Do not render it as a yellow legal flag.

This resolves the inconsistency that existed in an earlier prototype.

---

# 13. PROJECT ARTEFACTS

## Project A

### Vendor DPA, Provider A
Relied on:
- vendor
- no training
- brief storage

While the vendor flag is awaiting review, show:

> **1 flag affects this**

### Approval memo, 12 Mar
Relied on:
- human review before any action

### Original conditions
Relied on:
- launch regions
- default settings

### Privacy review
Relied on:
- data categories handled

## Project B

### Approval memo, 2 Feb
Relied on:
- copy review only

## Project C

### Approval memo, 20 Jun
Relied on:
- launch regions

## Project D

### Approval memo, 5 May
Relied on:
- training off

### Vendor DPA, Provider A
Relied on:
- brief storage

## Project E

### Approval memo, 18 Aug
Relied on:
- off by default for large customers

### Copyright coverage check
Relied on:
- output covered for eligible plans

### Source content review
Relied on:
- only licensed content used

---

# 14. AI TRACKING DATA

AI tracking is a **demonstration-only read-only concept**.

It does not create legal flags by itself.

## Tracking item 1

- Source: Slack #onboarding-flow
- Project: B
- Team: Product management
- Date: today
- Snippet:
  > "switching the onboarding tips to the cheaper model next week, same setup otherwise"
- Possible: Vendor change
- Confidence: 71%
- Status: Not submitted

## Tracking item 2

- Source: Jira SUP-318
- Project: A
- Team: Engineering
- Date: yesterday
- Snippet:
  > "Keep chatbot transcripts longer for QA review"
- Possible: Data kept longer
- Confidence: 66%
- Status: Not submitted

## Tracking item 3

- Source: Jira LAUNCH-77
- Project: C
- Team: Product management
- Date: 6 Oct
- Snippet:
  > "Open the beta to customers in Japan next quarter"
- Possible: Jurisdiction
- Confidence: 63%
- Status: Not submitted

## Already waiting

- Source: Jira DATA-204
- Project: D
- Team: Engineering
- Snippet:
  > "Export board data to a new analytics tool"
- Possible: Data category
- Status:
  > Requested from Engineering · 7 Oct

---

# 15. DESIGN SYSTEM

Use the following design system unless the existing project already has an equivalent implementation that preserves these exact visual rules.

## Typography

Font:
**Inter**

Sizes:
- Page title: 28px semibold
- Card title: 16px medium
- Body: 16px
- Small labels/metadata: minimum 13px
- Tags: 13px
- Buttons: 15px

## Colours

### Primary
`#1F3A5F`

Use for:
- buttons
- links
- active icons
- avatar badge
- selected controls

Selected fill:
`#E8EEF6`

Selected text:
`#1F3A5F`

### Page background
`#F7F8FA`

### Cards/panels
`#FFFFFF`

### Borders
`#E3E6EB`

### Main text
`#1A1D23`

### Secondary text
`#4A5260`

Never use a lighter secondary text colour that becomes difficult to read.

### Urgent
Bar:
`#D92D20`

Tag fill:
`#FDE8E6`

Tag text:
`#A32116`

### Later
Bar:
`#F5B301`

Tag fill:
`#FEF3C7`

Tag text:
`#7A5200`

Never use white text on yellow.

### Resolved
Bar:
`#2E9E5B`

Tag fill:
`#E3F4EA`

Tag text:
`#14633A`

### Logged
Bar:
`#C5CAD3`

Text:
grey/dark grey

## Status words

Use these words consistently:
- **urgent**
- **later**
- **resolved**

Category tags are grey with dark text.

Red, yellow and green are reserved for status meaning.

---

# 16. LAYOUT

Target:
**1440 × 900 desktop/laptop**

Prefer no scrolling on primary screens.

Do not create unnecessarily tall layouts.

Use:
- fixed/slim sidebar on Magfi screens
- centered content area
- cards/panels
- clear hierarchy
- sufficient whitespace
- accessible contrast

---

# 17. SIDEBAR

Magfi screens have a slim left sidebar.

Icons:
1. Dashboard
2. Tickets
3. Settings

Dashboard:
- opens Home

Tickets:
- opens Tickets

Settings:
- does nothing unless a future implementation explicitly requires it

Bottom:
- small **MG** avatar

Every Magfi screen also has:

**Reset demo**

at bottom-left.

---

# 18. RESET DEMO

"Reset demo" must work.

When clicked:
- return to Screen 0
- restore starting data
- remove any added project
- restore bell to 6
- restore Project A to 1 live / 1 resolved
- restore all flags to their initial state
- restore AI tracking items
- restore tickets
- restore decision state
- restore all notification state
- restore selected/default screen state

This must behave like a clean demo restart.

---

# 19. ROLE BAR

## Magfi view

Thin bar:

> Viewing as Magfi, Junior Counsel

Link:

> Switch to team view

Clicking it:
- opens Screen 0

## Team view

Thin bar:

> Viewing as [team]

Link:

> Switch to Magfi's view

Clicking it:
- opens Home

---

# 20. SCREEN 0 — SUBMIT A CHANGE

This is the team-facing starting screen.

No sidebar.

Top-left:

**Checkpoint**

Title:

**Submit a change**

## 20.1 Team selector

Label:

**Your team**

Options:
- Engineering
- Product management
- Design

The selected team is visually obvious.

## 20.2 Project selector

Label:

**Project**

Display clickable project cards for:
- A
- B
- C
- D
- E

Each contains:
- project name
- one-line subtitle

Selected project:
- dark border
- light selected fill

Default selected project:
**Project A**

After the five projects:

Dashed card:

> **+ Add a new project**

Small helper text:

> Any team can add a project. Legal is told when one is added.

## 20.3 Add project

Clicking "+ Add a new project" opens an inline form:

- Project name — required
- One-line description
- Cancel
- Add project

On Add:
- create the project in browser state
- create a new project card
- select it
- empty document title
- empty short summary
- feature becomes free text instead of dropdown

The new project should receive:
- no approval
- no live flags
- no resolved flags
- no logged flags
- grey "No approval on record" status on Home after submission

## 20.4 Project-dependent defaults

Selecting a project:
- selects its default team
- fills document title
- fills short summary
- fills feature

The team remains changeable.

## 20.5 Feature

For existing projects:
- dropdown containing the selected project's feature

For newly added projects:
- text input

## 20.6 Planned date

Place beside Feature.

Initial value:

**12 Oct 2026**

## 20.7 Document title

Label:

**Document title**

## 20.8 Short summary

Label:

**Short summary**

Helper:

> A few sentences, in your own words

## 20.9 Document attachment

Dashed upload-style box.

Text:

> PDF, Word or text file

Button:

> Add document

This is fake.

No actual file upload is necessary.

Clicking Add document creates a sample file chip based on the document title.

Example:

**Chatbot-cost-reduction-v2.pdf · 142 KB**

Chip includes:
- filename
- size
- x/remove control

## 20.10 Submission summary

Box title:

**You're adding this under**

Rows:
- Document
- Project
- Team

Before document attachment:

> No document added yet

After attachment:
- document title
- project + feature
- team

Update live.

## 20.11 Informational note

Use exactly:

> **Every change is checked automatically. You'll only hear from Legal if something needs a look.**

## 20.12 Submit button

Initially disabled/grey.

Enabled once a document is added.

On click:
1. show full-screen submission state
2. title:
   **Submitted**
3. show:
   **[Project] · [Feature] · [Team]. Legal's agent is checking it. Switching to Magfi's view.**
4. hold approximately 1.5 seconds
5. open Home in Magfi view

---

# 21. SUBMISSION BEHAVIOUR

## Project A — important demo path

If the user submits the first Project A sample:

Create a new live item:

**Chatbot moves to a different model vendor**

Fields:
- Project A
- Engineering
- Chatbot cost reduction v2
- Support chatbot
- Vendor change
- urgent
- status: Awaiting your review
- label: New

Effects:
- bell: 6 → 7
- Project A: 1 live → 2 live

This new item appears at the top of the Live list.

## Projects B–E

Submitting their sample document results in:

Grey banner:

> **Checked: no flag raised. Logged.**

Nothing else changes.

This demonstrates that not every change becomes a legal issue.

## New project

If a newly added project is submitted:

Grey banner:

> **[Project name] has no approval on record, so there was nothing to compare against. Logged.**

Add the new project card after the existing projects.

Show:

**No approval on record**

in grey.

Counts do not change.

---

# 22. SCREEN 1 — HOME / PROJECTS

Magfi's primary dashboard.

Header:

**Projects**

Header controls:
- bell
- people icon
- people count: **19**

Initial bell:
**6**

The bell count includes only unread red/yellow live items.

It does not count green resolved items.

---

# 23. HOME FILTERS

## Group by

Options:
- Department
- Feature
- Document
- AI tracking

AI tracking has a small badge:

**3**

Also show a box/input:

**Your own keywords**

## Show

Options:
- All
- Legal
- Non-legal

## Grouping behaviour

Group by:
- Department
- Feature
- Document

Clicking active group button again removes grouping.

Example:

> Engineering (2)

## Show behaviour

### All
Shows:
- live
- resolved
- logged

### Legal
Shows:
- live
- resolved

### Non-legal
Shows:
- logged

## Keyword search

Live filtering across:
- title
- project
- team
- document
- feature
- category

Filters work together.

No match:

> **No flags match**

Filters must never alter:
- bell count
- project status meaning
- underlying data

---

# 24. HOME PROJECT CARDS

Five starting cards.

Each shows:
- name
- subtitle
- avatar stack
- people count
- status line

Do not show a generic "Live" tag.

## Project A starting state

**1 live**

**1 resolved**

Live indicator:
- red if any live item is urgent
- otherwise yellow

## Project B starting state

**All clear**

**1 resolved**

Green tick.

## Project C

**1 live**

## Project D

**2 live**

## Project E

**2 live**

**1 resolved**

Counts must update after decisions.

---

# 25. HOME FLAG LIST

Three sections, in this exact order:

## Live

Ordering:
1. red urgent
2. yellow later

Each row:
- coloured left bar
- title
- project
- team
- source document
- feature
- category tag
- status

## Resolved

Each row:
- green tick
- "Sent back to [team]"
- outcome
- date

## Logged, no flag

Grey.

Use:
- "Logged, no flag raised"
- Non-legal where applicable

---

# 26. HOME NAVIGATION

Clicking a project card:
- opens Project page

Clicking the Project A vendor-change item:
- opens Flag Detail

Other flag rows:
- can remain non-clickable unless explicitly connected by this specification

Clicking AI tracking:
- replaces the list area with Screen 7

Clicking another Group by:
- returns to normal list view

Project cards and bell do not count AI Tracking items.

---

# 27. BELL / NOTIFICATIONS

Click bell.

Dropdown title:

**Notifications**

Link:

**Mark all as read**

Rows in order:
1. red
2. yellow
3. green

Each row contains:
- coloured bar
- category
- project
- title
- team
- time
- unread dot where unread

Bell number:
- only unread red/yellow
- green never increments it

## Mark all as read

Sets number to:

**0**

Rows remain visible.

## Notification navigation

Click vendor-change row:
- opens Flag Detail

Other rows:
- open their project page

Footer:

**View all tickets**

opens Tickets.

## Initial notifications

Start with:
- 6 live
- 3 resolved

Project A submission:
- adds new red "New" row at top
- bell 6 → 7

---

# 28. SCREEN 2 — PROJECT PAGE

Header:
- project name
- subtitle
- avatars
- people count
- bell

No generic Live tag.

## Tabs

Final tab order:

1. **AI brief**
2. **Issues**
3. **Artefacts**

AI brief opens first.

AI brief tab has a small sparkle icon.

---

# 29. PROJECT ISSUES TAB

Shows only that project's:
- Live
- Resolved
- Logged

sections.

Reuse:
- Group by
- Show
- keyword controls

But limit results to that project.

Only the vendor-change row has a:

**Review**

link.

Clicking it opens Flag Detail.

---

# 30. PROJECT ARTEFACTS TAB

List project-specific artefacts.

Each artefact displays:
- name
- what it relied on
- affected-flag indicator when relevant

Project A Vendor DPA should show:

**1 flag affects this**

only while the vendor flag is awaiting review.

After the vendor flag is resolved, this temporary affected indicator should disappear unless the prototype state explicitly requires otherwise.

---

# 31. AI BRIEF TAB

This is a required addition to the Project page.

Purpose:

Give Magfi a concise, structured explanation of the submitted document and how it relates to previously approved facts.

This is an **AI-generated briefing representation**, not a legal recommendation.

## 31.1 Opening behaviour

AI Brief is the first tab when a project is opened from:
- Home
- project cards
- bell

## 31.2 Where to start

At top:

Light-grey box.

Heading:

**Where to start**

One or two sentences for that project.

Important:
- suggests review order only
- never states a legal outcome
- never says "approve"
- never says "reject"
- never replaces the decision

Use concise project-specific guidance.

For Project A, the practical intent should be:

> Start with the current change document, then compare the vendor, training, and retention facts against the approval artefacts before deciding whether the change needs legal follow-up.

Do not turn this into a legal recommendation.

## 31.3 Document selector

Below:

- dropdown of that project's documents
- newest first
- status tag
- "View full document" link

The link does nothing in the prototype.

Status examples:
- Live · urgent
- Live · later
- Resolved
- Logged

Use status colours consistent with the main design system.

## 31.4 AI-generated disclaimer

Use exactly:

> **AI-generated from the submitted document. Check it against the original. It does not recommend a decision.**

## 31.5 Default selected document

When opening:
1. select live document if one exists
2. otherwise select newest document

## 31.6 What the document says

Section:

**What the document says**

Show concise bullet points derived from the selected fake document.

Do not fabricate additional facts.

For Project A, the bullets should communicate:
- chatbot is moving to a cheaper AI model
- provider is changing
- customer chat messages will be sent to the new provider
- screens are not changing

## 31.7 Compared with what Legal approved

Section:

**Compared with what Legal approved**

Table columns:

| Fact | Approved | In this document | Status |
|---|---|---|---|

Status examples:
- Changed
- Not stated
- Unchanged

Status tags in this comparison table are neutral and must not be confused with urgency.

Use dark fill/white text for "Changed" if following the supplied prototype direction.

Use grey outline for "Not stated".

For Project A:

| Fact | Approved | In this document | Status |
|---|---|---|---|
| Vendor | Provider A | Provider B (new) | Changed |
| Training on data | off | unknown | Not stated |
| Data kept | briefly | unknown | Not stated |

The AI Brief must not tell Magfi what decision to make.

---

# 32. SCREEN 3 — FLAG DETAIL / DECISION

This opens as a panel.

This is the heart of the Legal workflow.

## Header

- red urgent tag
- Vendor change
- confidence 87%

## Source

Show:

> Change document: Chatbot cost reduction v2, Engineering, today

Highlight:

> **a cheaper AI model from a different provider**

## Legal approved box

Title:

**Legal approved**

Facts:
- Vendor: Provider A
- Training on data: off
- Data kept: briefly

## Now changing box

Title:

**Now changing**

Facts:
- Vendor: Provider B (new)
- Training on data: unknown
- Data kept: unknown

## Why it matters

Use:

> **A new vendor can start a notice period to customers, and its data terms may differ from what was approved.**

## Artefact

Use:

> **Check this artefact: Vendor DPA, clause 4.2**

## Human review notice

Yellow notice with lock icon:

> **This needs your review. The agent can't act on it automatically.**

---

# 33. LEGAL DECISION OPTIONS

Section:

**Your decision**

Three selectable cards.

Initially:
- none selected

Options:

1. **Approved, go ahead**
2. **Needs a comprehensive review**
3. **Changes required**

Selecting one reveals its corresponding decision panel.

---

# 34. DECISION — APPROVED

Show:

**Send to**

Engineering

Read-only.

Note field prefilled:

> Approved as submitted. You can go ahead as planned.

Button:

**Send to Engineering**

---

# 35. DECISION — COMPREHENSIVE REVIEW

Show:

**Assign to**

Options:
- Senior Counsel
- Privacy team

Note prefilled:

> This change needs a full review before it can go ahead.

Button:

**Start comprehensive review**

On confirmation:
- create scripted ticket
- ticket ID:
  **LEGAL-212**
- remove vendor flag from awaiting review
- create "Under comprehensive review" red state
- bell 7 → 6 if this action followed a new Project A submission
- Project A becomes 2 live
- no green notification

---

# 36. DECISION — CHANGES REQUIRED

Heading:

**Required legal changes (suggested by the agent, edit as needed)**

Three items, initially ticked and editable:

1. **Get written confirmation that Provider B will not train on customer data.**
2. **Get written confirmation that Provider B keeps data only briefly.**
3. **Notify customers of the new provider at least 15 days before go-live.**

Include:

**Add another change**

text input.

Note prefilled:

> You can go ahead once these changes are done.

Button:

**Send to Engineering**

Important:
These are suggested changes in the fictional demo. The UI must preserve the human-in-the-loop framing.

---

# 37. SCREEN 4 — DECISION SENT

Heading depends on outcome.

## Approved

> **Sent back to Engineering: Approved, go ahead**

## Changes required

> **Sent back to Engineering: Changes required**

## Comprehensive review

> **Comprehensive review started · LEGAL-212 · assigned to [assignee]**

Show:
- short summary
- decision
- note

---

# 38. AUDIT TRAIL

Use a visible audit trail.

For the core Project A demo:

> 10:42 am - Engineering submitted the change document

> 10:42 am - Agent read it and flagged a vendor change, 87% confidence

> 11:05 am - Magfi opened the flag

> 11:09 am - Magfi decided: [outcome]

Then:

For Approved / Changes required:

> 11:09 am - Sent back to Engineering

For comprehensive review:

> 11:09 am - Ticket LEGAL-212 created for Senior Counsel

The exact displayed times are demo data.

---

# 39. DECISION EFFECTS

## Approved or Changes required

The vendor flag:
- leaves awaiting review
- bell drops from 7 → 6
- moves to Resolved
- appears green
- Project A becomes:
  - 1 live
  - 2 resolved

Resolved text:

> Sent back to Engineering · [outcome] · today

Add green notification:

> Chatbot cost reduction v2 sent back to Engineering · [outcome]

## Comprehensive review

The vendor flag:
- leaves awaiting review
- bell drops from 7 → 6
- becomes red:
  **LEGAL-212 · Under comprehensive review**
- Project A:
  - 2 live
- no green notification

---

# 40. SCREEN 4 BUTTONS

Button:

**See what Engineering sees**

Opens Screen 5.

This should work even for comprehensive review.

Button:

**Back to Project A**

Returns to Project A.

---

# 41. SCREEN 5 — LEGAL RESPONSE / TEAM VIEW

This is the team-facing final screen.

Role bar:

> Viewing as Engineering

Link:

> Switch to Magfi's view

Card title:

> **Legal's response to: Chatbot cost reduction v2**

Subtitle:

> Project A · Support chatbot · Engineering

---

# 42. TEAM RESPONSE — APPROVED

Green outcome banner:

> **Approved. You can go ahead.**

Show the legal note.

---

# 43. TEAM RESPONSE — COMPREHENSIVE REVIEW

Red outcome banner:

> **Needs a comprehensive review. Do not go ahead until Legal confirms.**

Show:

> LEGAL-212 · with Senior Counsel

Show note.

---

# 44. TEAM RESPONSE — CHANGES REQUIRED

Yellow outcome banner:

> **Changes required before you go ahead.**

Show the required changes as a checklist.

Team can tick them.

Show note.

Button:

**Resubmit with changes**

This button does nothing in the prototype.

Button:

**Back to Magfi's view**

opens Home.

---

# 45. SCREEN 6 — TICKETS

Open through sidebar ticket icon or Notifications footer.

Title:

**Tickets**

Team filters:
- All
- Engineering
- Product management
- Design

They work.

Three columns:

## Awaiting your review

Contains live flags.

Order:
- red first
- yellow second

## Under comprehensive review

Initially empty.

Show:

> **Nothing under review**

After comprehensive review:
- show LEGAL-212

## Sent back to team

Contains green resolved cards.

Each card:
- coloured left bar
- title
- project
- team
- source document
- grey category tag

Sent-back cards additionally show:

> Sent back to [team] · [outcome] · [date]

Cards move between columns according to decisions.

---

# 46. SCREEN 7 — AI TRACKING

AI Tracking is accessed inside Home through Group by → AI tracking.

## Read-only information bar

Use:

> **AI tracking is on and read-only. Watching Slack #onboarding-flow, #summaries-dev, #image-style and Jira projects A to E. Never watched: direct messages and HR channels. Only the triggering snippet is kept.**

## Heading

> **Possible changes spotted in conversations · not submitted as a document**

## Cards

Cards must be neutral grey.

Do NOT use:
- red
- yellow
- green

Each card includes:
- Slack/Jira icon
- source
- project
- team
- date
- quoted snippet
- Possible: [category]
- confidence
- grey "Not submitted" tag

Buttons:
- Ask team to submit a document
- Not a change

---

# 47. AI TRACKING — ASK TEAM

Click:

**Ask team to submit a document**

Show:

> **Request sent to [team]. It becomes a flag once they submit a document.**

Move the item into:

**Waiting for team**

Give it:

> Requested from [team] · today

Important:

The item remains non-legal/neutral.

It does not become a flag.

---

# 48. AI TRACKING — NOT A CHANGE

Click:

**Not a change**

Remove the card.

Lower the AI Tracking badge.

Never create a legal flag.

---

# 49. AI TRACKING SEARCH/FILTER RULES

Keyword box works.

Non-legal filter:
- should show nothing here

AI Tracking items:
- do not affect project counts
- do not affect bell count
- do not affect legal flag count
- do not become legal flags without formal submission

---

# 50. DATA / STATE MODEL FOR FRONTEND

Use a clean local state model.

A database is not required.

Recommended conceptual entities:

## Project

```ts
type Project = {
  id: string;
  name: string;
  subtitle: string;
  people: number;
  avatars: string[];
  defaultTeam: Team;
  feature: string;
  approvalExists: boolean;
};
```

## Change document

```ts
type ChangeDocument = {
  id: string;
  projectId: string;
  title: string;
  team: Team;
  feature: string;
  plannedDate: string;
  summary: string;
  fileName?: string;
  status: "live" | "resolved" | "logged";
  urgency?: "urgent" | "later";
  category?: Category;
  createdAt: string;
};
```

## Flag

```ts
type Flag = {
  id: string;
  title: string;
  projectId: string;
  team: Team;
  documentId: string;
  feature: string;
  category: Category;
  urgency: "urgent" | "later";
  status:
    | "awaiting-review"
    | "resolved"
    | "comprehensive-review"
    | "logged";
  outcome?: "approved" | "changes-required" | "comprehensive-review";
  confidence?: number;
};
```

## Approval artefact

```ts
type Artefact = {
  id: string;
  projectId: string;
  name: string;
  reliedOn: string;
  temporaryAffectedCount?: number;
};
```

## Tracking item

```ts
type TrackingItem = {
  id: string;
  sourceType: "Slack" | "Jira";
  source: string;
  projectId: string;
  team: Team;
  date: string;
  snippet: string;
  possibleCategory: Category;
  confidence: number;
  status: "not-submitted" | "waiting";
};
```

## Ticket

```ts
type Ticket = {
  id: string;
  title: string;
  description: string;
  projectId: string;
  team: Team;
  assignee?: "Senior Counsel" | "Privacy team";
  status: "comprehensive-review" | "sent-back";
};
```

## Audit entry

```ts
type AuditEntry = {
  time: string;
  actor: string;
  action: string;
};
```

Do not build a backend for these models.

---

# 51. STATE TRANSITION RULES

## Starting state

Bell:
**6**

Project A:
- 1 live
- 1 resolved

## Submit Project A

Create:
- vendor change
- urgent
- awaiting review
- New

Bell:
**7**

Project A:
- 2 live
- 1 resolved

## Resolve Project A as Approved

Bell:
**6**

Project A:
- 1 live
- 2 resolved

## Resolve Project A as Changes Required

Bell:
**6**

Project A:
- 1 live
- 2 resolved

## Comprehensive Review

Bell:
**6**

Project A:
- 2 live
- 1 resolved

One live item becomes:
**LEGAL-212 · Under comprehensive review**

## Reset

Restore everything to starting state.

---

# 52. LEGAL LOGIC — PROTOTYPE ONLY

The actual matching engine is not being implemented as a real AI system.

The UI should represent the expected result using scripted demo data.

Conceptually:

```text
submitted change
       ↓
identify project
       ↓
retrieve approval facts
       ↓
compare change with approval facts
       ↓
identify possible category
       ↓
if material enough → flag
else → logged/no flag
       ↓
Legal review
       ↓
human decision
       ↓
team response + audit trail
```

The prototype should not pretend that the 87% confidence score is scientifically calibrated.

It is illustrative demo data.

---

# 53. PROJECT A — PRIMARY DEMO SCENARIO

This is the most important scenario.

## Starting situation

Project A:
- Customer-facing support chatbot
- 1 live
- 1 resolved

Engineering wants to reduce cost.

## Engineering submission

Title:
**Chatbot cost reduction v2**

Summary:

> Moving the support chatbot to a cheaper AI model from a different provider. No change to the screens. Customer chat messages will be sent to the new provider.

## Checkpoint result

New flag:

**Chatbot moves to a different model vendor**

Category:
**Vendor change**

Urgency:
**urgent**

Confidence:
**87%**

## Comparison

Approved:
- Provider A
- Training off
- Data kept briefly

Now changing:
- Provider B
- training unknown
- retention unknown

## Why it matters

> A new vendor can start a notice period to customers, and its data terms may differ from what was approved.

## Artefact

> Vendor DPA, clause 4.2

## Human decision

Magfi chooses one of:
- Approved
- Comprehensive review
- Changes required

For the primary demo, prefer:

**Changes required**

because it creates a visible end-to-end legal intervention and team response.

The comprehensive-review path must still work as an alternate state.

---

# 54. SECONDARY SCENARIO — NO LEGAL FLAG

Project B:

**Onboarding copy changes**

Change:
- wording only
- no product behaviour change
- no data change

Expected:

**Logged, no flag raised**

This is important because it demonstrates the product is not simply flagging every submission.

---

# 55. SECONDARY SCENARIO — URGENT JURISDICTION

Project C:

**EU rollout plan**

Category:
**Jurisdiction**

Urgency:
**urgent**

Approval artefact:
**Approval memo, 20 Jun**

Approval fact:
**launch regions**

Use this as supporting dashboard data.

---

# 56. SECONDARY SCENARIO — TRAINING

Project D:

**Summary quality plan**

Category:
**Training**

Urgency:
**urgent**

Relevant approval:
**Approval memo, 5 May**

Approved fact:
**training off**

Use as supporting data.

---

# 57. SECONDARY SCENARIO — DEFAULT SETTING

Project E:

**Image feature launch plan**

Category:
**Default setting**

Urgency:
**later**

Relevant approval:
**Approval memo, 18 Aug**

Approved fact:
**off by default for large customers**

Use as supporting data.

---

# 58. NAVIGATION MAP

```text
SCREEN 0
Submit a change
   │
   └── Submit
         │
         ▼
   Submission confirmation
         │
         ▼
SCREEN 1 — HOME
   │
   ├── Project card
   │      ▼
   │   SCREEN 2 — PROJECT
   │      ├── AI brief
   │      ├── Issues
   │      └── Artefacts
   │
   ├── Vendor change row
   │      ▼
   │   SCREEN 3 — FLAG DETAIL
   │      │
   │      ├── Approved
   │      ├── Changes required
   │      └── Comprehensive review
   │             ▼
   │       SCREEN 4 — DECISION SENT
   │             │
   │             ├── Back to Project A
   │             └── See what Engineering sees
   │                    ▼
   │              SCREEN 5 — TEAM RESPONSE
   │
   ├── Bell
   │      ├── Flag detail
   │      ├── Project page
   │      └── Tickets
   │
   ├── Tickets icon
   │      ▼
   │   SCREEN 6 — TICKETS
   │
   └── AI tracking
          ▼
       SCREEN 7 — AI TRACKING
```

---

# 59. COMPONENT ARCHITECTURE

Use reusable components rather than duplicating UI.

Suggested components:

- `AppShell`
- `Sidebar`
- `RoleBar`
- `ResetDemo`
- `ProjectCard`
- `ProjectSelector`
- `ProjectTabs`
- `StatusTag`
- `CategoryTag`
- `FlagRow`
- `FlagList`
- `NotificationBell`
- `NotificationDropdown`
- `FilterBar`
- `KeywordFilter`
- `DocumentSelector`
- `DocumentChip`
- `ArtefactCard`
- `ApprovalComparison`
- `AIReviewNotice`
- `DecisionCard`
- `DecisionPanel`
- `AuditTrail`
- `TicketCard`
- `TicketBoard`
- `TrackingCard`
- `SubmissionForm`
- `SubmissionConfirmation`
- `TeamResponseCard`

Do not create unnecessary abstraction purely for abstraction's sake.

---

# 60. ROUTING / SCREEN MANAGEMENT

If the existing codebase already uses a router, preserve it.

If not, a lightweight route/state system is acceptable for the prototype.

Required destinations conceptually:

```text
/team/submit
/home
/project/:id
/project/:id?tab=ai-brief
/project/:id?tab=issues
/project/:id?tab=artefacts
/flag/:id
/decision/:id
/team-response
/tickets
/tracking
```

These are conceptual.

Do not introduce a backend solely to support routing.

---

# 61. FORM BEHAVIOUR

The submission form must:
- prefill Project A
- prefill Engineering
- prefill A's sample document
- update project-dependent fields
- allow changing team
- allow removing fake attachment
- disable Submit without attachment
- support Add Project
- show live submission summary

A new project must not accidentally inherit another project's approval.

---

# 62. FILTER BEHAVIOUR

All filters must be real UI interactions.

Test combinations such as:

- Show Legal + Department
- Show Non-legal
- keyword "chatbot"
- keyword "vendor"
- keyword "Project A"
- Feature grouping
- Document grouping
- clear filters
- no-match state

Filtering must not mutate the underlying data.

---

# 63. VISUAL STATUS RULES

Use a consistent semantic system.

| State | Visual |
|---|---|
| urgent | red |
| later | yellow |
| resolved | green |
| logged/no flag | grey |
| AI tracking | neutral grey |

Do not use red/yellow/green for unrelated decoration.

---

# 64. ACCESSIBILITY / USABILITY

At minimum:
- buttons have clear labels
- text is readable
- selected states are obvious
- disabled buttons look disabled
- colour is not the only status indicator
- urgent/later/resolved words remain visible
- yellow text has sufficient contrast
- keyboard interaction should work where practical
- interactive elements have hover/focus states

---

# 65. RESPONSIVENESS

Primary target:
**1440 × 900**

The assessment is desktop-oriented.

Do not spend substantial time building mobile-specific flows unless the existing project already supports them naturally.

The important requirement is that the demo works cleanly on the presentation laptop.

---

# 66. ERROR / EMPTY STATES

Required:

### No filter results
> **No flags match**

### No approval
> **[Project name] has no approval on record, so there was nothing to compare against. Logged.**

### No comprehensive reviews
> **Nothing under review**

### No attachment
Submit remains disabled.

Do not invent elaborate error states.

---

# 67. AI LANGUAGE RULES

Avoid presenting the prototype as an autonomous legal decision-maker.

Good:
- "Possible vendor change"
- "Flagged for review"
- "Check this artefact"
- "Suggested next step"
- "This needs your review"

Bad:
- "AI determined this is illegal"
- "AI approved the change"
- "AI rejected the change"
- "The system guarantees compliance"
- "Legal decision made by AI"

---

# 68. CONFIDENCE RULE

The confidence score is illustrative.

Project A demo:
**87%**

Tracking:
- 71%
- 66%
- 63%

Do not build a mathematical confidence engine.

Do not imply that the numbers are legally meaningful.

---

# 69. DOCUMENT HANDLING RULE

There are no real uploads.

"Add document" creates a fake file chip.

The prototype may store:
- filename
- title
- sample size

in local state.

No file bytes need to be processed.

---

# 70. SECURITY / PRIVACY PROTOTYPE PRINCIPLES

The prototype should visually and conceptually respect:

- human review
- read-only agent
- deliberate team submission
- limited tracking
- exclusion of DMs and HR channels
- audit trail
- no automatic ticket creation

The AI Tracking information bar should explicitly state:

> Never watched: direct messages and HR channels.

Do not implement actual Slack/Jira access.

---

# 71. AI TRACKING SAFETY MODEL

The conceptual model is:

```text
Slack/Jira observation
       ↓
Possible change
       ↓
Neutral card
"Not submitted"
       ↓
Ask team to submit
       ↓
Team submits document
       ↓
Formal Checkpoint analysis
       ↓
Legal flag, if appropriate
```

Never:

```text
Slack/Jira observation
       ↓
automatic legal flag
```

---

# 72. IMPLEMENTATION APPROACH FOR CLAUDE CODE

Before editing:

1. Inspect the existing repository.
2. Identify framework and entry points.
3. Identify existing screens/components.
4. Identify existing seed data.
5. Run the project locally.
6. Preserve useful existing work.
7. Compare implementation against this specification.
8. Implement missing requirements.
9. Remove/fix inconsistent behaviour.
10. Test the core workflow.

Do not blindly rebuild the entire project if the existing implementation is already strong.

However, if the existing prototype architecture makes the required workflow unreliable, refactor it cleanly.

---

# 73. CODE QUALITY EXPECTATIONS

Use:
- TypeScript if the existing project uses it
- reusable components
- typed data structures
- a central seed-data/state layer
- clear event/state transitions
- no duplicated hardcoded values where avoidable
- no dead navigation
- no console errors during normal use

Avoid:
- giant monolithic component files
- duplicated state for the same entity
- random magic strings
- fake APIs created solely to simulate local state
- unnecessary dependencies
- production backend work

---

# 74. CENTRAL DEMO STATE

A central demo-state model should control:

- projects
- documents
- flags
- artefacts
- tickets
- tracking items
- notifications
- current role
- current decision
- current selected project
- filters
- grouping
- unread count

This makes Reset Demo reliable.

---

# 75. RESET IMPLEMENTATION

Use a pristine initial-state factory.

Conceptually:

```ts
const createInitialDemoState = () => ({
  projects: initialProjects,
  documents: initialDocuments,
  flags: initialFlags,
  artefacts: initialArtefacts,
  tickets: initialTickets,
  trackingItems: initialTrackingItems,
  notifications: initialNotifications,
  ...
});
```

Reset should replace the current state with a fresh initial state.

Do not mutate the original seed objects directly.

---

# 76. CORE DEMO TEST

The following test must pass.

## Step 1

Open Submit a change.

Expected:
- Project A selected
- Engineering selected
- Chatbot cost reduction v2 visible

## Step 2

Add document.

Expected:
- fake file chip appears
- summary box updates
- Submit enabled

## Step 3

Submit.

Expected:
- Submitted transition
- then Home

## Step 4

Home.

Expected:
- bell 7
- new red vendor flag at top
- Project A 2 live

## Step 5

Open vendor flag.

Expected:
- Flag Detail panel
- Vendor change
- urgent
- confidence 87%
- Provider A vs Provider B
- training off vs unknown
- retention briefly vs unknown
- why-it-matters text
- Vendor DPA clause 4.2
- human-review notice

## Step 6

Select Changes required.

Expected:
- three editable checked requirements
- note
- Send to Engineering

## Step 7

Send.

Expected:
- Decision Sent
- audit trail
- Project A button
- See what Engineering sees

## Step 8

Open Engineering view.

Expected:
- yellow Changes required banner
- checklist
- note
- Resubmit with changes button

## Step 9

Return to Magfi.

Expected:
- Home
- vendor flag moved to resolved
- bell 6
- Project A 1 live / 2 resolved
- green notification

## Step 10

Reset demo.

Expected:
- clean initial state
- bell 6
- Project A 1 live / 1 resolved
- new submission removed

---

# 77. SECONDARY TESTS

## Test A — No flag

Submit Project B.

Expected:
- "Checked: no flag raised. Logged."
- no bell increase
- no new legal flag

## Test B — New project

Add:
- name: Test project
- description: Test description

Submit.

Expected:
- no approval
- logged
- grey No approval on record
- no bell increase

## Test C — Comprehensive review

Project A vendor flag:
- choose comprehensive review
- select Senior Counsel

Expected:
- LEGAL-212
- Under comprehensive review
- red
- Project A 2 live
- no green notification

## Test D — Tracking

Open AI tracking.

Expected:
- 3 initial cards
- neutral grey
- badge 3

Click Ask team.

Expected:
- item moves to Waiting for team
- status changes
- it does not become a legal flag

## Test E — Not a change

Click Not a change.

Expected:
- card disappears
- tracking badge decreases
- no legal flag

## Test F — Filters

Test:
- Department
- Feature
- Document
- All
- Legal
- Non-legal
- keyword

Expected:
- correct list
- no underlying state corruption

---

# 78. DEMO RECOVERY

Because this is a live presentation prototype:

The prototype must be easy to reset.

Before demo:
1. click Reset demo
2. verify bell 6
3. verify Project A 1 live / 1 resolved
4. verify vendor-change row is available only after submission
5. perform one rehearsal
6. reset again before presentation

The presenter should never need to manually repair state.

---

# 79. DEMO SCRIPT — 60 TO 90 SECONDS

Recommended sequence:

### 1. Team side
"Engineering has a planned change to the support chatbot."

Submit:
**Chatbot cost reduction v2**

### 2. Transition
"Checkpoint checks the change against the facts behind the previous legal approval."

### 3. Magfi Home
"Instead of Legal finding out later, the change comes back as a review item."

Open:
**Chatbot moves to a different model vendor**

### 4. Review
Show:
- Provider A → Provider B
- training off → unknown
- retention brief → unknown
- Vendor DPA
- human review notice

### 5. Decision
Choose:
**Changes required**

Show the three suggested requirements.

### 6. Team response
Open Engineering view.

Show:
**Changes required before you go ahead.**

### 7. Close
The key message:

> "Checkpoint doesn't make the legal decision. It makes sure the right change gets back to the right lawyer, with the original approval facts still visible."

---

# 80. PITCH CONNECTION

The prototype should support the pitch narrative:

## Problem
Legal approvals become stale when product changes happen later.

## User
Junior/product counsel, represented by Magfi.

## Existing workflow failure
Changes are distributed across teams and Legal is re-engaged inconsistently.

## Intervention
Checkpoint connects planned changes to previous legal approval facts.

## How it works
Submit → compare → flag → human review → decision → response → audit trail.

## Value
- fewer missed re-reviews
- clearer ownership
- traceability
- human legal judgment preserved

## Limitation
The prototype uses fake data and scripted logic.

## Next step
Pilot with a small legal/product team and validate whether the surfaced categories and flags are useful.

---

# 81. IMPLEMENTATION LOGIC — IA 2

The implementation note should focus on **how the solution could realistically be introduced into an institution/workflow**, not on technical architecture alone.

Target length:
**100–150 words**

It should address:
- pilot environment
- access
- existing workflow integration
- approval/ownership
- data access
- access controls
- maintenance
- expansion

Suggested implementation direction:

Checkpoint could first be piloted with one product area that already performs recurring legal reviews of AI features. Legal would define the approval facts and artefacts for a small set of projects, while Engineering and Product teams would use a lightweight change-submission workflow before material releases. Access would be role-based, with Legal able to review flags and teams able to submit and view responses relevant to their projects. During the pilot, every flag would remain subject to human review and the system would operate in a shadow/validation mode before becoming part of a release process. The pilot team would review false positives, missed changes and usability issues regularly. Once the categories, escalation rules and ownership model are validated, the workflow could expand to additional projects and departments and later connect to existing project-management systems.

Do not present this as an implemented backend.

---

# 82. ADOPTION NOTE — IA 2

Adoption is different from implementation.

The adoption note should answer:

> Why would the people involved actually use Checkpoint?

Target:
**100–150 words**

Address:
- Legal trust
- Engineering friction
- Product convenience
- onboarding
- training
- gradual pilot
- champions
- support
- feedback

Suggested direction:

Legal teams are more likely to adopt Checkpoint if it reduces missed changes without taking away professional judgment. Engineering and Product teams need the submission process to be quick and predictable, rather than feeling like a new approval gate for every minor change. Adoption can begin with a small pilot and a limited number of projects, with Legal champions reviewing the first flags and teams receiving clear explanations of why a change was surfaced. Short onboarding sessions can demonstrate what must be submitted and what Checkpoint does not decide. Feedback from both Legal and product teams should be used to refine categories and reduce false positives. Once users see that routine changes can be logged without escalation while genuinely material changes receive focused attention, the workflow can gradually become part of the normal release process.

---

# 83. LIMITATIONS TO ACKNOWLEDGE

This prototype does not prove:
- actual AI classification accuracy
- legal correctness
- enterprise scalability
- real Slack/Jira integration
- real document parsing
- production security
- actual customer notice obligations
- complete legal coverage
- actual confidence calibration

The prototype demonstrates the **interaction model and workflow concept**.

---

# 84. DO NOT CLAIM

Do not claim:
- "The AI knows whether something is legally compliant."
- "The AI makes legal decisions."
- "The system guarantees compliance."
- "The prototype is production-ready."
- "Slack/Jira integration is live."
- "The confidence score is validated."
- "The prototype uses real legal data."
- "The system replaces Legal."

---

# 85. DO CLAIM

It is accurate to say:

- Checkpoint identifies potential changes that may affect earlier approvals.
- The prototype compares a submitted change with recorded approval facts.
- It surfaces a flag for human review.
- The lawyer makes the final decision.
- The decision is returned to the submitting team.
- The workflow includes an audit trail.
- The prototype demonstrates how the concept could work.

---

# 86. FUTURE IMPLEMENTATION — OUT OF CURRENT SCOPE

These may be mentioned in future work but should not consume IA 2 build time:

## Backend
- API
- database
- document storage

## AI
- actual document extraction
- structured fact extraction
- classification
- confidence calibration
- evaluation dataset

## Integrations
- Slack
- Jira
- project-management systems

## Security
- SSO
- RBAC
- audit logging
- encryption
- retention policies

## Production
- monitoring
- deployment
- backups
- observability
- incident response

These are future implementation considerations, not IA 2 requirements.

---

# 87. FINAL BUILD CHECKLIST

## Problem / UX
- [ ] Core problem visible through workflow
- [ ] Primary user is clear
- [ ] Team submission flow is clear
- [ ] Legal review flow is clear
- [ ] Team response is clear

## Screens
- [ ] Screen 0 Submit
- [ ] Home
- [ ] Project page
- [ ] AI Brief
- [ ] Issues
- [ ] Artefacts
- [ ] Flag detail
- [ ] Decision sent
- [ ] Team response
- [ ] Tickets
- [ ] AI Tracking

## Interactions
- [ ] Project selection
- [ ] Team selection
- [ ] Add project
- [ ] Fake attachment
- [ ] Submit
- [ ] Home navigation
- [ ] Project navigation
- [ ] Vendor flag review
- [ ] Decision selection
- [ ] Decision submission
- [ ] Engineering response
- [ ] Ticket state
- [ ] AI tracking actions
- [ ] Filters
- [ ] Keyword search
- [ ] Bell
- [ ] Mark all as read
- [ ] Reset demo

## Data
- [ ] All five projects
- [ ] Six starting live flags
- [ ] Three resolved
- [ ] Two logged/no-flag
- [ ] Artefacts
- [ ] Tracking items
- [ ] Project A submission result
- [ ] New-project result

## Visual
- [ ] Inter
- [ ] Navy primary
- [ ] Correct status colours
- [ ] Grey category tags
- [ ] No white text on yellow
- [ ] Clear selected states
- [ ] 1440×900-friendly
- [ ] No unnecessary scrolling

## Legal UX
- [ ] Human-review notice
- [ ] Agent never makes decision
- [ ] AI brief does not recommend decision
- [ ] Tracking does not automatically create flags
- [ ] Audit trail visible
- [ ] Fake data only

## Testing
- [ ] Core demo path tested
- [ ] No-flag scenario tested
- [ ] New-project scenario tested
- [ ] Comprehensive-review scenario tested
- [ ] AI tracking tested
- [ ] Filters tested
- [ ] Reset tested
- [ ] No console errors
- [ ] Presentation rehearsal completed

---

# 88. DEFINITION OF DONE

The build is considered complete for IA 2 when:

1. A new user can understand what Checkpoint does within the first screen.
2. Engineering can submit a fake change.
3. The system visibly processes the submission.
4. A relevant legal flag appears for Project A.
5. Magfi can open the flag.
6. Magfi can see the approved-vs-changing comparison.
7. Magfi can make a decision.
8. The decision changes the application state.
9. Engineering can see the response.
10. The audit trail records the sequence.
11. Bell/project counts update correctly.
12. No-flag changes remain no-flag.
13. AI Tracking remains separate from formal legal flags.
14. AI Brief is visible and useful without making legal decisions.
15. Reset Demo restores a clean starting state.
16. The complete workflow can be demonstrated reliably in 60–90 seconds.
17. The interface looks like one coherent product rather than disconnected mockups.
18. The prototype does not imply production functionality that does not exist.

---

# 89. IMPORTANT INSTRUCTION TO CLAUDE CODE

**Do not start by adding a backend.**

First inspect the current frontend/project.

Then:

1. understand the existing implementation
2. preserve useful work
3. implement the missing IA 2 workflow
4. centralize demo state
5. make all required interactions reliable
6. fix seed-data inconsistencies
7. implement the AI Brief addition
8. test the core demo path
9. test Reset Demo
10. polish the UI
11. only after the workflow works, perform final cleanup

If there is a conflict between a generic architecture idea and this IA 2 prototype specification, **this specification wins for the current build**.

If a feature is not required by this specification, do not add it merely because it seems useful.

The goal is not to build the largest product.

The goal is to build the **clearest, most coherent, fully clickable representation of the intended Checkpoint experience**.

---

# 90. SOURCE / SCOPE NOTE

This build specification consolidates:
- the Checkpoint project technical brief
- the original Lovable prototype prompt
- the defined seed data and legal-change scenarios
- the AI Brief addition
- the IA 2 instructor clarification
- the current decision that IA 2 is a working/clickable prototype rather than a deployment-ready product

Where earlier planning documents described backend/database/API infrastructure, those elements have intentionally been separated into future scope.

Where earlier prototype data contained inconsistencies, the current specification explicitly resolves them for a coherent demo.

The prototype remains educational, fictional, and fake-data-only.

---

# END OF MASTER BUILD SPEC
