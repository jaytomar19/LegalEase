export interface TicketDetailData {
  id: string;
  ticketNumber: string;
  title: string;
  urgency: "High" | "Medium" | "Low";
  status: "Awaiting review" | "Under review" | "Needs information" | "Sent back to team";
  project: string;
  team: string;
  raisedBy: string;
  raisedDate: string;
  docButton: string;
  beforeText: string;
  afterText: string;
  whyFlagged: string;
  approval: string;
  affectedCondition: string;
  sources: string[];
  amberChip?: string;
  nextStep: string;
  basedOn?: string;
  waitingFor?: string[];
  sentBackDate?: string;
  feedbackText?: string;
  tags: string[];
}

export const TICKETS_DATA: Record<string, TicketDetailData> = {
  "1042": {
    id: "1042",
    ticketNumber: "#1042",
    title: "AI provider changed from Vendor A to Vendor B",
    urgency: "High",
    status: "Awaiting review",
    project: "Lumen Compose",
    team: "Product",
    raisedBy: "Sarah Chen",
    raisedDate: "8 Oct 2026, 10:42 AM",
    docButton: "PRD v1.4",
    beforeText: 'Lumen Compose will use Provider A for code generation.',
    afterText: 'Lumen Compose will use Provider B for code generation.',
    whyFlagged: "Potential re-review trigger. A new vendor can start a notice period to customers, and its data terms may differ from what was approved.",
    approval: "Vendor DPA, clause 4.2 (Baseline v1)",
    affectedCondition: "Approved AI provider list.",
    sources: ["PRD v1.4", "Vendor DPA", "Legal memo", "Slack discussion"],
    amberChip: "Provider B data location not found",
    nextStep: "Request Provider B's data terms and retention details, then check whether vendor change requirements apply before go-live.",
    basedOn: "approved baseline, vendor-change trigger, missing Provider B documentation.",
    tags: ["Vendor", "Contract"]
  },
  "1043": {
    id: "1043",
    ticketNumber: "#1043",
    title: "Feature rollout in EU region",
    urgency: "Medium",
    status: "Awaiting review",
    project: "Lumen Sites",
    team: "Product",
    raisedBy: "Priya Shah",
    raisedDate: "7 Oct 2026",
    docButton: "PRD v2.1",
    beforeText: 'Lumen Sites will be available to customers in the United States only.',
    afterText: 'Lumen Sites will also be available to customers in the EU from next month.',
    whyFlagged: "Potential re-review trigger. The project's approved Legal baseline lists launch regions as the United States only. The PRD adds the EU.",
    approval: "Legal review, 15 Aug 2026 (Baseline v2)",
    affectedCondition: "Approved launch regions, US only.",
    sources: ["PRD v2.1", "Legal memo", "Privacy review", "Slack discussion"],
    amberChip: "EU data location not found",
    nextStep: "Confirm where EU customers' data will be processed, then check whether regional data terms apply before launch.",
    basedOn: "approved baseline, jurisdiction trigger, missing data-location information.",
    tags: ["Privacy", "Data use"]
  },
  "1054": {
    id: "1054",
    ticketNumber: "#1054",
    title: "Default-on AI image feature",
    urgency: "Medium",
    status: "Under review",
    project: "Lumen Weave",
    team: "Design",
    raisedBy: "Jordan Lee",
    raisedDate: "5 Oct 2026",
    docButton: "Design spec v1.3",
    beforeText: 'The AI image feature is off by default for large customers.',
    afterText: 'The AI image feature is on by default for every plan.',
    whyFlagged: "Potential re-review trigger. The approved Legal baseline lists the image feature as off by default for large customers. The design spec turns it on for all plans.",
    approval: "Legal review, 18 Sep 2026 (Baseline v1)",
    affectedCondition: "Default setting for large customers, and consumer disclosure.",
    sources: ["Design spec v1.3", "Legal memo", "Copyright coverage check", "Slack discussion"],
    amberChip: "Large-customer notice plan not found",
    nextStep: "Check whether large customers' agreements allow the new default and whether a consumer disclosure is needed, then record the decision.",
    tags: ["Default setting", "Consumer"]
  },
  "1055": {
    id: "1055",
    ticketNumber: "#1055",
    title: "New third-party Slack export",
    urgency: "Low",
    status: "Under review",
    project: "Lumen Sites",
    team: "Product",
    raisedBy: "Maya Rao",
    raisedDate: "3 Oct 2026",
    docButton: "PRD v2.2",
    beforeText: 'Customers can export designs as files only.',
    afterText: 'Customers can also export designs directly to Slack.',
    whyFlagged: "Potential re-review trigger. The approved Legal baseline doesn't list Slack as a third party that can receive customer content. The PRD adds a Slack export.",
    approval: "Legal review, 15 Aug 2026 (Baseline v2)",
    affectedCondition: "Approved third-party integrations.",
    sources: ["PRD v2.2", "Legal memo", "Security assessment"],
    amberChip: "Slack DPA executed copy not found",
    nextStep: "Verify whether Slack integration requires an updated subprocessor disclosure or DPA terms before enabling exports.",
    tags: ["Privacy", "Data use"]
  },
  "1066": {
    id: "1066",
    ticketNumber: "#1066",
    title: "Clarification on purchase-history input",
    urgency: "Medium",
    status: "Needs information",
    project: "Lumen Assist",
    team: "Product",
    raisedBy: "Daniel Park",
    raisedDate: "6 Oct 2026",
    docButton: "Spec v1.1",
    beforeText: 'Lumen Assist processes user queries using active context only.',
    afterText: 'Lumen Assist includes user purchase history in AI prompt context.',
    whyFlagged: "Potential re-review trigger. Including purchase history adds sensitive customer transaction data to prompt payloads.",
    approval: "Legal review, 12 Aug 2026 (Baseline v1)",
    affectedCondition: "Permitted AI input data types.",
    sources: ["Spec v1.1", "Data flow chart"],
    amberChip: "Retention period details missing",
    nextStep: "Obtain missing data flow context from engineering before evaluating privacy baseline compliance.",
    waitingFor: ["Data fields", "Data source", "Retention period"],
    tags: ["Data category", "Privacy"]
  },
  "1067": {
    id: "1067",
    ticketNumber: "#1067",
    title: "AI request logs kept for longer",
    urgency: "Low",
    status: "Needs information",
    project: "Lumen Assist",
    team: "Engineering",
    raisedBy: "Daniel Park",
    raisedDate: "6 Oct 2026",
    docButton: "Arch doc v0.9",
    beforeText: 'AI request logs are purged after 14 days.',
    afterText: 'AI request logs will be retained for 90 days for debug purposes.',
    whyFlagged: "Potential re-review trigger. Extending log retention from 14 to 90 days exceeds the approved 30-day maximum retention baseline.",
    approval: "Legal review, 12 Aug 2026 (Baseline v1)",
    affectedCondition: "Maximum log retention window.",
    sources: ["Arch doc v0.9", "Security policy"],
    amberChip: "Data minimization rationale missing",
    nextStep: "Confirm security access controls and auto-deletion policy for 90-day log storage.",
    waitingFor: ["Log encryption details", "Access controls", "Purge mechanism"],
    tags: ["Privacy", "Data use"]
  },
  "1078": {
    id: "1078",
    ticketNumber: "#1078",
    title: "New AI provider for image captions",
    urgency: "Low",
    status: "Sent back to team",
    project: "Lumen Weave",
    team: "Design",
    raisedBy: "Jordan Lee",
    raisedDate: "29 Sep 2026",
    docButton: "Design doc v2.0",
    beforeText: 'Image captions generated using in-house model.',
    afterText: 'Image captions generated using third-party Vision API.',
    whyFlagged: "Potential re-review trigger. Switching to external Vision API introduces third-party subprocessor data processing.",
    approval: "Legal review, 18 Sep 2026 (Baseline v1)",
    affectedCondition: "Approved subprocessor list.",
    sources: ["Design doc v2.0", "Vendor evaluation"],
    amberChip: "Subprocessor terms not provided",
    nextStep: "Wait for project team to attach executed DPA and zero-data-retention confirmation.",
    sentBackDate: "29 Sep 2026",
    feedbackText: "Please provide the executed DPA for Vision API vendor before proceeding with integration.",
    tags: ["Vendor", "Contract"]
  },
  "1079": {
    id: "1079",
    ticketNumber: "#1079",
    title: "Updated launch copy needs disclosure",
    urgency: "Medium",
    status: "Sent back to team",
    project: "Lumen Brand",
    team: "Marketing",
    raisedBy: "Alex Kim",
    raisedDate: "27 Sep 2026",
    docButton: "Marketing copy v1.2",
    beforeText: 'Generate AI artwork instantly for your brand.',
    afterText: 'Generate AI artwork and copyright-guaranteed brand assets instantly.',
    whyFlagged: "Potential re-review trigger. Making explicit copyright guarantees in marketing claims requires prior Legal indemnity review.",
    approval: "Legal review, 10 Sep 2026 (Baseline v1)",
    affectedCondition: "Approved marketing claims and disclaimers.",
    sources: ["Marketing copy v1.2", "Brand guidelines"],
    amberChip: "Legal disclaimer copy missing",
    nextStep: "Review updated marketing copy once team removes unqualified IP guarantee.",
    sentBackDate: "27 Sep 2026",
    feedbackText: "Remove 'copyright-guaranteed' phrase or append approved Terms of Service limitation disclaimer.",
    tags: ["Privacy", "Data use"]
  }
};
