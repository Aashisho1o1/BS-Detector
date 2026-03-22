// ============================================================
// PERSON DATABASE — Tier 1 Hand-Curated Financial Ties
// ============================================================

export const PERSON_DB = {
  jensen_huang: {
    name: "Jensen Huang",
    title: "CEO & Co-founder, NVIDIA",
    primary_company: "NVIDIA",
    primary_ticker: "NVDA",
    initials: "JH",
    color: "#76b900",
    financial_ties: [
      { type: "equity", entity: "NVIDIA (NVDA)", detail: "Owns ~3.5% of NVDA (~$86B+)", directness: 1.0 },
      { type: "compensation", entity: "NVIDIA", detail: "CEO comp tied to NVDA stock price", directness: 1.0 },
      { type: "supply_chain", entity: "TSMC (TSM)", detail: "NVIDIA is TSMC's top AI chip customer", directness: 0.4 },
    ],
    benefits_when: [
      "gpu demand increases", "ai compute spending rises", "data center capex grows",
      "ai training demand increases", "ai inference demand increases",
      "cloud providers buy more gpus", "autonomous vehicle compute demand rises",
    ],
  },
  elon_musk: {
    name: "Elon Musk",
    title: "CEO of Tesla & SpaceX; Founder of xAI; Owner of X",
    primary_company: "Tesla",
    primary_ticker: "TSLA",
    initials: "EM",
    color: "#e31937",
    financial_ties: [
      { type: "equity", entity: "Tesla (TSLA)", detail: "Owns ~13% of TSLA (~$130B+)", directness: 1.0 },
      { type: "founder", entity: "xAI (Grok)", detail: "Founded xAI, valued ~$50B+", directness: 1.0 },
      { type: "owner", entity: "X (Twitter)", detail: "Acquired for $44B", directness: 1.0 },
      { type: "founder", entity: "SpaceX", detail: "~42% ownership, ~$350B valuation", directness: 1.0 },
      { type: "founder", entity: "Neuralink", detail: "Brain-computer interfaces", directness: 0.9 },
      { type: "political", entity: "US Gov (DOGE)", detail: "Leads Dept of Gov Efficiency", directness: 0.5 },
    ],
    benefits_when: [
      "ev adoption accelerates", "ai hype increases", "autonomous driving gains credibility",
      "twitter/x engagement grows", "ai compute demand rises", "government deregulation occurs",
      "crypto prices rise", "robotics hype increases", "space industry grows",
    ],
  },
  sam_altman: {
    name: "Sam Altman",
    title: "CEO of OpenAI",
    primary_company: "OpenAI",
    primary_ticker: null,
    initials: "SA",
    color: "#10a37f",
    financial_ties: [
      { type: "equity", entity: "OpenAI", detail: "CEO with ~$10B+ equity stake", directness: 1.0 },
      { type: "partnership", entity: "Microsoft (MSFT)", detail: "MSFT invested ~$13B, 49% profit share", directness: 0.6 },
      { type: "investment", entity: "Helion Energy", detail: "Personal bet on fusion → AI data center power", directness: 0.7 },
      { type: "founder", entity: "Worldcoin/World", detail: "Co-founded crypto/identity project", directness: 0.8 },
    ],
    benefits_when: [
      "ai adoption increases", "agi narrative gains traction", "enterprise ai spending grows",
      "openai api usage grows", "chatgpt subscriptions increase", "microsoft stock rises",
      "ai regulation favors incumbents", "nuclear/fusion energy demand grows",
    ],
  },
  chamath_palihapitiya: {
    name: "Chamath Palihapitiya",
    title: "CEO of Social Capital; All-In Podcast host",
    primary_company: "Social Capital",
    primary_ticker: null,
    initials: "CP",
    color: "#7c3aed",
    financial_ties: [
      { type: "fund", entity: "Social Capital", detail: "Manages tech/healthcare/climate investments", directness: 1.0 },
      { type: "spac", entity: "Various SPACs (IPOA-F)", detail: "Promoted multiple SPACs, several crashed", directness: 0.9 },
      { type: "media", entity: "All-In Podcast", detail: "Co-host; narrative drives his portfolio themes", directness: 0.6 },
      { type: "investment", entity: "Crypto holdings", detail: "Known Bitcoin/crypto positions", directness: 0.8 },
    ],
    benefits_when: [
      "tech sector rallies", "crypto prices rise", "spac market recovers",
      "healthcare innovation hype", "climate tech gets funding", "podcast audience grows",
    ],
  },
  marc_andreessen: {
    name: "Marc Andreessen",
    title: "Co-founder & GP, a16z",
    primary_company: "a16z",
    primary_ticker: null,
    initials: "MA",
    color: "#2563eb",
    financial_ties: [
      { type: "fund", entity: "a16z", detail: "Co-founded a16z (~$42B AUM)", directness: 1.0 },
      { type: "board", entity: "Meta (META)", detail: "Board member of Meta/Facebook", directness: 0.8 },
      { type: "portfolio", entity: "AI startups (Mistral, Character.ai, etc.)", detail: "Heavy AI portfolio", directness: 0.9 },
      { type: "portfolio", entity: "Crypto/Web3", detail: "a16z crypto fund ($7.6B+)", directness: 0.9 },
    ],
    benefits_when: [
      "ai startup valuations rise", "crypto adoption increases", "tech deregulation happens",
      "meta stock appreciates", "enterprise ai adoption grows", "open source ai wins",
    ],
  },
  satya_nadella: {
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    primary_company: "Microsoft",
    primary_ticker: "MSFT",
    initials: "SN",
    color: "#00a4ef",
    financial_ties: [
      { type: "equity", entity: "Microsoft (MSFT)", detail: "~$50M+ annual comp, heavily stock-based", directness: 1.0 },
      { type: "partnership", entity: "OpenAI", detail: "MSFT invested ~$13B in OpenAI", directness: 0.6 },
    ],
    benefits_when: [
      "enterprise ai adoption grows", "azure cloud grows", "copilot subscriptions increase",
      "ai pc refresh cycle starts", "openai succeeds", "github copilot adoption rises",
    ],
  },
  sundar_pichai: {
    name: "Sundar Pichai",
    title: "CEO of Alphabet/Google",
    primary_company: "Alphabet",
    primary_ticker: "GOOGL",
    initials: "SP",
    color: "#fbbc04",
    financial_ties: [
      { type: "equity", entity: "Alphabet (GOOGL)", detail: "~$200M+ annual comp, stock-based", directness: 1.0 },
    ],
    benefits_when: [
      "ai search adoption grows", "google cloud grows", "ai integration drives ad revenue",
      "youtube engagement grows", "android ecosystem expands",
    ],
  },
  lisa_su: {
    name: "Lisa Su",
    title: "CEO of AMD",
    primary_company: "AMD",
    primary_ticker: "AMD",
    initials: "LS",
    color: "#ed1c24",
    financial_ties: [
      { type: "equity", entity: "AMD (AMD)", detail: "CEO comp heavily stock-based", directness: 1.0 },
    ],
    benefits_when: [
      "ai chip demand grows", "data center gpu demand rises", "cpu market share shifts to amd",
      "ai inference demand increases",
    ],
  },
  david_sacks: {
    name: "David Sacks",
    title: "GP at Craft Ventures; White House AI & Crypto Czar",
    primary_company: "Craft Ventures",
    primary_ticker: null,
    initials: "DS",
    color: "#f59e0b",
    financial_ties: [
      { type: "fund", entity: "Craft Ventures", detail: "GP, invested in crypto/AI/SaaS", directness: 1.0 },
      { type: "political", entity: "US Gov (AI & Crypto Czar)", detail: "Shapes AI/crypto policy", directness: 0.7 },
      { type: "portfolio", entity: "Crypto projects", detail: "Heavy crypto via Craft", directness: 0.9 },
    ],
    benefits_when: [
      "crypto deregulation happens", "ai deregulation happens", "enterprise saas grows",
      "pro-crypto policy enacted", "tech-friendly regulation passes",
    ],
  },
};

// ============================================================
// SAMPLE CLAIMS
// ============================================================

export const SAMPLE_CLAIMS = [
  {
    id: "jensen_tokens",
    claim: "Every employee paid $500K should be burning $250K worth of AI tokens a year.",
    speaker: "jensen_huang",
    source: "Interview / Conference",
    date: "Mar 2025",
  },
  {
    id: "elon_agi",
    claim: "AI will be smarter than any single human by end of next year.",
    speaker: "elon_musk",
    source: "X (Twitter) post",
    date: "Apr 2024",
  },
  {
    id: "sam_agi",
    claim: "We are beginning to see the early glimpses of AGI. GPT-4 was the first sign.",
    speaker: "sam_altman",
    source: "Davos interview",
    date: "Jan 2024",
  },
  {
    id: "satya_ai",
    claim: "Every company needs to become an AI company or they will be disrupted within 5 years.",
    speaker: "satya_nadella",
    source: "Microsoft Build keynote",
    date: "May 2024",
  },
  {
    id: "chamath_btc",
    claim: "Bitcoin is going to $500,000. It's the hardest money ever created by humanity.",
    speaker: "chamath_palihapitiya",
    source: "All-In Podcast",
    date: "Mar 2024",
  },
];

// ============================================================
// MOCK RESULTS — Pre-computed analysis for demo mode
// ============================================================

export const MOCK_RESULTS = {
  jensen_tokens: {
    claim: "Every employee paid $500K should be burning $250K worth of AI tokens a year.",
    speaker_id: "jensen_huang",
    decomposition: {
      implied_action: "Companies should massively increase AI token spending to ~50% of top employee salaries",
      domain: "AI compute spending & inference GPU demand",
      extremity: 9,
      extremity_reason: "The $250K/year figure is 10–100× typical enterprise AI spend per employee with no cited benchmark",
    },
    hypotheses: [
      { id: "H1", chain: "More token spending → More API inference calls → More GPU demand → NVIDIA, AMD" },
      { id: "H2", chain: "More tokens → Bigger AI budgets → Enterprise LLM platform spend → OpenAI, Anthropic, Google" },
      { id: "H3", chain: "More tokens → Companies build/rent GPU clusters → Cloud hyperscalers → AWS, Azure, GCP → buy NVIDIA H100s" },
      { id: "H4", chain: "More token spending → Increased electricity/cooling → Data center REITs + energy companies" },
      { id: "H5", chain: "More token spend → More fine-tuning/training → Training GPU demand → NVIDIA dominant" },
    ],
    conflict: {
      matches: [
        { hypothesis: "H1", connection: "DIRECT", confidence: "HIGH", explanation: "NVIDIA is the dominant inference GPU vendor — Jensen's ~$86B stake benefits directly" },
        { hypothesis: "H2", connection: "NONE", confidence: "HIGH", explanation: "OpenAI/Anthropic are not in Jensen's direct financial ties" },
        { hypothesis: "H3", connection: "DIRECT", confidence: "HIGH", explanation: "Cloud GPU clusters are overwhelmingly NVIDIA H100/H200 — drives NVDA revenue" },
        { hypothesis: "H4", connection: "INDIRECT", confidence: "MEDIUM", explanation: "Some tangential benefit via TSMC as NVIDIA's fab partner" },
        { hypothesis: "H5", connection: "DIRECT", confidence: "HIGH", explanation: "NVIDIA holds 70-80%+ market share in training GPUs" },
      ],
      doubt_reasons: [
        "The $250K/employee figure is extraordinary — ~50% of a $500K salary, with zero cited industry benchmark or ROI study to support it",
        "Jensen owns ~3.5% of NVIDIA (~$86B stake); every 1% increase in GPU demand adds billions to his net worth",
        "The claim was made the same quarter NVIDIA was guiding investors on 'inference scaling' as the next growth narrative",
      ],
      fair_points: [
        "AI token costs have fallen 90%+ since 2023, making heavier usage economically more defensible for high-value roles",
        "Knowledge workers in high-leverage roles (lawyers, engineers, analysts) may genuinely generate outsized ROI from heavy AI use",
      ],
      bs_summary: "A highly self-serving claim from the CEO of the primary GPU beneficiary, using a specific dollar figure that dramatically overstates typical AI spend with no supporting data.",
    },
    bs_score: {
      score: 92,
      connection_rate: 32,
      directness: 30,
      magnitude: 20,
      extremity_score: 9,
    },
  },

  elon_agi: {
    claim: "AI will be smarter than any single human by end of next year.",
    speaker_id: "elon_musk",
    decomposition: {
      implied_action: "Believe AGI is imminent; invest in and adopt AI technology urgently now",
      domain: "AI adoption & xAI/Tesla AI valuation",
      extremity: 8,
      extremity_reason: "Specific timeline prediction (1 year) for AGI is extraordinary given no consensus definition exists",
    },
    hypotheses: [
      { id: "H1", chain: "AGI belief spreads → Urgency to buy AI products → xAI Grok adoption grows → xAI valuation rises" },
      { id: "H2", chain: "AGI narrative → Tesla FSD credibility boost → Tesla stock appreciation → Musk net worth rises" },
      { id: "H3", chain: "AGI hype → More AI investment → AI startups compete → Grok gets more users via X platform" },
      { id: "H4", chain: "AGI belief → More AI compute demand → GPU market grows → Musk needs GPUs for xAI training" },
      { id: "H5", chain: "AGI narrative → Talent flocks to AI → xAI can recruit top researchers away from competitors" },
    ],
    conflict: {
      matches: [
        { hypothesis: "H1", connection: "DIRECT", confidence: "HIGH", explanation: "xAI is Elon's personal AI company — AGI hype directly boosts its $50B+ valuation" },
        { hypothesis: "H2", connection: "DIRECT", confidence: "HIGH", explanation: "Tesla FSD is Elon's core AGI-adjacent product; belief in imminent AI drives TSLA premium" },
        { hypothesis: "H3", connection: "DIRECT", confidence: "HIGH", explanation: "xAI's Grok is distributed exclusively via X, which Elon owns — AGI hype drives platform engagement" },
        { hypothesis: "H4", connection: "INDIRECT", confidence: "MEDIUM", explanation: "Elon is a major GPU buyer, not seller — indirect effect on xAI build costs" },
        { hypothesis: "H5", connection: "DIRECT", confidence: "MEDIUM", explanation: "xAI has directly recruited from OpenAI and Anthropic; AGI hype helps with hiring" },
      ],
      doubt_reasons: [
        "Elon has made identical AGI timeline predictions annually since 2017, repeatedly moving the goalposts when deadlines pass",
        "xAI's valuation is directly tied to the AGI narrative — a more skeptical market would slash the $50B figure Elon uses for fundraising",
        "The prediction conveniently came weeks before an xAI funding round, anchoring investor expectations to urgency",
      ],
      fair_points: [
        "AI capability benchmarks have genuinely exceeded many expert predictions in each of the past 3 years",
        "Elon has historically been directionally correct on tech timelines, even if the exact dates slip",
      ],
      bs_summary: "Elon profits from AGI belief through xAI valuation, Tesla FSD narrative, and X engagement — 4 of 5 chains connect directly back to his holdings.",
    },
    bs_score: {
      score: 88,
      connection_rate: 35,
      directness: 30,
      magnitude: 20,
      extremity_score: 8,
    },
  },

  sam_agi: {
    claim: "We are beginning to see the early glimpses of AGI. GPT-4 was the first sign.",
    speaker_id: "sam_altman",
    decomposition: {
      implied_action: "Treat OpenAI as the leading AGI lab; accelerate enterprise AI adoption via OpenAI products",
      domain: "Enterprise AI adoption & OpenAI valuation",
      extremity: 8,
      extremity_reason: "Claiming a specific product (GPT-4) is the 'first sign of AGI' with no agreed definition is an extraordinary and unfalsifiable assertion",
    },
    hypotheses: [
      { id: "H1", chain: "AGI belief → OpenAI seen as leading lab → ChatGPT/API subscriptions surge → OpenAI revenue grows" },
      { id: "H2", chain: "AGI narrative → Enterprise urgency to adopt AI → Azure OpenAI deals → Microsoft profit share to OpenAI" },
      { id: "H3", chain: "AGI hype → More AI investment flows → OpenAI preferred for fundraising → Sam's equity stake appreciates" },
      { id: "H4", chain: "AGI timing sets regulatory tone → 'Safety-first' incumbents win → OpenAI's regulatory moat widens" },
      { id: "H5", chain: "AGI narrative → More AI talent joins OpenAI → Competitive position strengthens vs Anthropic, Google" },
    ],
    conflict: {
      matches: [
        { hypothesis: "H1", connection: "DIRECT", confidence: "HIGH", explanation: "Sam's $10B+ equity stake means every 10% valuation increase = $1B in personal wealth" },
        { hypothesis: "H2", connection: "DIRECT", confidence: "HIGH", explanation: "Microsoft's 49% profit share is directly tied to OpenAI revenue; Sam benefits from MSFT's investment success" },
        { hypothesis: "H3", connection: "DIRECT", confidence: "HIGH", explanation: "OpenAI raised at $157B valuation in 2024 — AGI narrative is a core fundraising lever" },
        { hypothesis: "H4", connection: "DIRECT", confidence: "MEDIUM", explanation: "Sam has consistently advocated for 'safety-first' AI regulation that advantages well-resourced incumbents" },
        { hypothesis: "H5", connection: "INDIRECT", confidence: "MEDIUM", explanation: "Talent pipeline is indirect — benefits the company but doesn't directly hit Sam's financial ties" },
      ],
      doubt_reasons: [
        "Sam holds $10B+ in OpenAI equity — framing GPT-4 as AGI-adjacent creates urgency to use OpenAI's products over competitors",
        "The claim was made at Davos, a premier fundraising and partner-pitching venue, immediately before a major OpenAI expansion",
        "No agreed-upon definition of AGI exists; the vagueness of the claim makes it unfalsifiable and purely narrative",
      ],
      fair_points: [
        "Sam was an early, consistent voice on AI capabilities when most CE Os were dismissive — he has a credibility track record",
        "GPT-4 genuinely scored in the 90th percentile on bar exams and other professional benchmarks, which is remarkable",
      ],
      bs_summary: "4 of 5 causal chains connect to OpenAI's valuation or Sam's equity — this is a textbook case of a founder hyping his core product at a fundraising venue.",
    },
    bs_score: {
      score: 85,
      connection_rate: 33,
      directness: 30,
      magnitude: 13,
      extremity_score: 8,
    },
  },

  satya_ai: {
    claim: "Every company needs to become an AI company or they will be disrupted within 5 years.",
    speaker_id: "satya_nadella",
    decomposition: {
      implied_action: "Companies must adopt AI immediately and comprehensively, creating urgency for AI tools and services",
      domain: "Enterprise AI adoption & cloud platform spending",
      extremity: 7,
      extremity_reason: "The 5-year disruption timeline is specific enough to create urgency without being falsifiable in the near term",
    },
    hypotheses: [
      { id: "H1", chain: "AI urgency → Companies buy Copilot/Azure AI → Microsoft cloud revenue grows → MSFT stock rises" },
      { id: "H2", chain: "AI adoption → Azure cloud migration accelerates → Azure market share grows → Satya's stock comp increases" },
      { id: "H3", chain: "Enterprise AI → Companies use OpenAI API via Azure → Microsoft profit share → MSFT revenue grows" },
      { id: "H4", chain: "AI urgency → Companies need AI PCs → Windows/Surface refresh cycle → Microsoft revenue" },
      { id: "H5", chain: "AI disruption fear → Companies hire AI consultants → Microsoft partner ecosystem grows → platform stickiness" },
    ],
    conflict: {
      matches: [
        { hypothesis: "H1", connection: "DIRECT", confidence: "HIGH", explanation: "Copilot is Microsoft's flagship product — Satya's stock comp directly benefits from AI adoption urgency" },
        { hypothesis: "H2", connection: "DIRECT", confidence: "HIGH", explanation: "Azure grew 29% YoY driven by AI workloads — Satya's compensation is heavily tied to MSFT stock" },
        { hypothesis: "H3", connection: "DIRECT", confidence: "HIGH", explanation: "Microsoft has 49% profit share from OpenAI — enterprise AI demand flows through Azure OpenAI" },
        { hypothesis: "H4", connection: "INDIRECT", confidence: "MEDIUM", explanation: "AI PC push is a real Microsoft narrative — indirect but genuine tie to earnings" },
        { hypothesis: "H5", connection: "INDIRECT", confidence: "LOW", explanation: "Partner ecosystem is very indirect; tangential to Satya's direct financial exposure" },
      ],
      doubt_reasons: [
        "The 'disrupt or die' framing is the oldest enterprise sales technique — it creates urgency to buy Microsoft's AI stack immediately",
        "Microsoft reported $13B in AI-related revenue in FY2024; Satya's stock comp directly tracks MSFT performance",
        "The specific claim benefits Azure (cloud) and Copilot (AI features) — both Microsoft core products — far more than any neutral AI advice would",
      ],
      fair_points: [
        "The historical record supports disruption claims — companies that ignored the mobile/SaaS shifts were genuinely disadvantaged",
        "Satya's credibility comes from Microsoft's own successful AI transformation, which provides genuine evidence for his thesis",
      ],
      bs_summary: "A well-packaged disruption narrative that creates urgency to buy Microsoft's AI products, with 3 direct causal chains back to Satya's compensation.",
    },
    bs_score: {
      score: 74,
      connection_rate: 24,
      directness: 30,
      magnitude: 13,
      extremity_score: 7,
    },
  },

  chamath_btc: {
    claim: "Bitcoin is going to $500,000. It's the hardest money ever created by humanity.",
    speaker_id: "chamath_palihapitiya",
    decomposition: {
      implied_action: "Buy and hold Bitcoin; reject traditional financial instruments in favor of crypto",
      domain: "Cryptocurrency adoption & Bitcoin price appreciation",
      extremity: 9,
      extremity_reason: "A specific $500K price target (6× current price) with no quantitative model is an extraordinary and unfalsifiable claim",
    },
    hypotheses: [
      { id: "H1", chain: "BTC price rises → Chamath's crypto holdings appreciate → Social Capital portfolio performance improves" },
      { id: "H2", chain: "Bitcoin adoption narrative → Crypto deregulation → All crypto assets rally → Portfolio positions grow" },
      { id: "H3", chain: "BTC belief spreads → All-In podcast audience grows → Chamath's media brand and influence grows" },
      { id: "H4", chain: "Bitcoin narrative → Institutional money flows into crypto → Chamath's blockchain portfolio companies get funded" },
      { id: "H5", chain: "BTC as 'hardest money' narrative → Anti-fiat sentiment grows → SPAC/private equity alternatives benefit" },
    ],
    conflict: {
      matches: [
        { hypothesis: "H1", connection: "DIRECT", confidence: "HIGH", explanation: "Chamath has publicly held significant Bitcoin positions — a 6× price increase dramatically benefits him" },
        { hypothesis: "H2", connection: "DIRECT", confidence: "HIGH", explanation: "Social Capital has crypto exposure; broader crypto rally lifts all positions" },
        { hypothesis: "H3", connection: "DIRECT", confidence: "HIGH", explanation: "All-In podcast is Chamath's primary brand platform — crypto content drives massive engagement" },
        { hypothesis: "H4", connection: "INDIRECT", confidence: "MEDIUM", explanation: "Chamath has blockchain/crypto startup investments that benefit from institutional inflows" },
        { hypothesis: "H5", connection: "INDIRECT", confidence: "LOW", explanation: "Anti-fiat sentiment is tangential to SPAC performance" },
      ],
      doubt_reasons: [
        "Chamath was buying Bitcoin before making this prediction on his own podcast — classic 'buy then tell your audience to buy'",
        "The $500K figure has circulated in crypto circles for years without a quantitative basis — it's a motivational target, not an analysis",
        "Chamath has a history of promoting assets publicly where he has undisclosed or semi-disclosed positions (e.g., SPAC promotions that later tanked)",
      ],
      fair_points: [
        "Bitcoin has historically outperformed essentially every asset class over 10-year horizons, giving some basis for long-term bull cases",
        "The 'hardest money' analogy to gold has a coherent theoretical basis in Austrian economics, even if the price target is speculative",
      ],
      bs_summary: "A Bitcoin bull call from a known Bitcoin holder on his own podcast — 3 direct causal chains connect, and the pattern matches his prior SPAC pump playbook.",
    },
    bs_score: {
      score: 87,
      connection_rate: 36,
      directness: 30,
      magnitude: 13,
      extremity_score: 9,
    },
  },
};
