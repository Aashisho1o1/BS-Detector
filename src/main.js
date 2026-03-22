import './style.css';
import { PERSON_DB, SAMPLE_CLAIMS, MOCK_RESULTS } from './data.js';

// ============================================================
// CONSTANTS
// ============================================================
const GAUGE = { WIDTH: 160, HEIGHT: 100, RADIUS: 72, LINE_WIDTH: 14 };
const ANIMATION = { GAUGE_DURATION: 1200, LOADING_STEP_DELAY: 700, TICKER_INTERVAL: 4000, TICKER_FADE: 400 };
const API = { TIMEOUT_MS: 120000, MAX_CLAIM_LENGTH: 1000 };

// ============================================================
// SECURITY — HTML escape utility
// ============================================================
function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

// ============================================================
// GAUGE — Canvas-based semi-circular score meter
// ============================================================
function drawGauge(canvas, score, animated = true) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width = GAUGE.WIDTH;
  const H = canvas.height = GAUGE.HEIGHT;
  const cx = W / 2;
  const cy = H - 8;
  const r = GAUGE.RADIUS;
  const startAngle = Math.PI;
  const endAngle = 2 * Math.PI;

  function getColor(pct) {
    // green → yellow → red
    if (pct < 0.4) {
      const t = pct / 0.4;
      return lerpColor('#22c55e', '#f59e0b', t);
    } else if (pct < 0.7) {
      const t = (pct - 0.4) / 0.3;
      return lerpColor('#f59e0b', '#ff6b35', t);
    } else {
      const t = (pct - 0.7) / 0.3;
      return lerpColor('#ff6b35', '#ef4444', t);
    }
  }

  function lerpColor(a, b, t) {
    const ah = parseInt(a.slice(1), 16);
    const bh = parseInt(b.slice(1), 16);
    const ar = (ah >> 16) & 0xff; const ag = (ah >> 8) & 0xff; const ab = ah & 0xff;
    const br = (bh >> 16) & 0xff; const bg = (bh >> 8) & 0xff; const bb = bh & 0xff;
    const rr = Math.round(ar + (br - ar) * t);
    const rg = Math.round(ag + (bg - ag) * t);
    const rb = Math.round(ab + (bb - ab) * t);
    return `rgb(${rr},${rg},${rb})`;
  }

  function draw(currentPct) {
    ctx.clearRect(0, 0, W, H);

    // Track background
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = GAUGE.LINE_WIDTH;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (currentPct > 0) {
      const fillEnd = startAngle + currentPct * Math.PI;
      const gradient = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(0.5, '#f59e0b');
      gradient.addColorStop(1, '#ef4444');

      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, fillEnd);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = GAUGE.LINE_WIDTH;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Tick marks
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (i / 10) * Math.PI;
      const x1 = cx + Math.cos(angle) * (r - 8);
      const y1 = cy + Math.sin(angle) * (r - 8);
      const x2 = cx + Math.cos(angle) * (r + 8);
      const y2 = cy + Math.sin(angle) * (r + 8);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  if (!animated) {
    draw(score / 100);
    return;
  }

  let start = null;
  const duration = ANIMATION.GAUGE_DURATION;
  const targetPct = score / 100;

  function animate(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    draw(eased * targetPct);
    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// ============================================================
// SPEAKER CARDS
// ============================================================
function renderSpeakerCards() {
  const grid = document.getElementById('speakers-grid');
  if (!grid) return;

  Object.entries(PERSON_DB).forEach(([id, person]) => {
    const card = document.createElement('div');
    card.className = 'speaker-card';
    card.style.setProperty('--speaker-color', person.color);
    card.style.cssText += `border-top: 2px solid ${person.color}22;`;

    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Analyze claims by ${person.name}`);

    const selectSpeaker = () => {
      document.getElementById('speaker-select').value = id;
      document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
    };
    card.addEventListener('click', selectSpeaker);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSpeaker(); }
    });

    const tickerBadge = person.primary_ticker
      ? `<span class="speaker-ticker">${escapeHTML(person.primary_ticker)}</span>`
      : '';

    const ties = person.financial_ties
      .slice(0, 3)
      .map(t => `<span class="tie-chip">${escapeHTML(t.type)}: ${escapeHTML(t.entity.split('(')[0].trim())}</span>`)
      .join('');

    card.innerHTML = `
      <div class="speaker-card-top">
        <div class="speaker-avatar" style="background: linear-gradient(135deg, ${person.color}, ${person.color}88)">${escapeHTML(person.initials)}</div>
        <div class="speaker-info">
          <div class="speaker-name">${escapeHTML(person.name)}</div>
          <div class="speaker-title-text">${escapeHTML(person.title)}</div>
        </div>
        ${tickerBadge}
      </div>
      <div class="speaker-ties">${ties}</div>
      <div class="speaker-card-stats">
        <div class="card-stat">
          <div class="card-stat-val">${person.financial_ties.length}</div>
          <div class="card-stat-label">Financial Ties</div>
        </div>
        <div class="card-stat">
          <div class="card-stat-val">${person.benefits_when.length}</div>
          <div class="card-stat-label">Benefit Triggers</div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ============================================================
// SPEAKER SELECT OPTIONS
// ============================================================
function populateSpeakerSelect() {
  const sel = document.getElementById('speaker-select');
  if (!sel) return;

  Object.entries(PERSON_DB).forEach(([id, person]) => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${person.name} — ${person.primary_company}`;
    sel.appendChild(opt);
  });
}

// ============================================================
// SAMPLE CLAIM PILLS
// ============================================================
function renderSamplePills() {
  const container = document.getElementById('sample-pills');
  if (!container) return;

  SAMPLE_CLAIMS.forEach(sc => {
    const pill = document.createElement('button');
    pill.className = 'claim-pill';
    const person = PERSON_DB[sc.speaker];
    pill.textContent = `${person?.initials || '?'} — ${sc.claim.substring(0, 38)}...`;
    pill.title = `${person?.name}: "${sc.claim}"`;

    pill.addEventListener('click', () => {
      document.getElementById('claim-text').value = sc.claim;
      document.getElementById('speaker-select').value = sc.speaker;
      // Highlight
      document.querySelectorAll('.claim-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });

    container.appendChild(pill);
  });
}

// ============================================================
// SCORE LABEL
// ============================================================
function getScoreLabel(score) {
  if (score >= 85) return { text: 'HIGHLY SELF-SERVING', cls: 'score-label-very-high' };
  if (score >= 65) return { text: 'SELF-SERVING', cls: 'score-label-high' };
  if (score >= 40) return { text: 'SOMEWHAT BIASED', cls: 'score-label-mid' };
  if (score >= 20) return { text: 'MILDLY BIASED', cls: 'score-label-low' };
  return { text: 'MOSTLY GENUINE', cls: 'score-label-low' };
}

// ============================================================
// RENDER RESULTS
// ============================================================
function renderResults(result) {
  const section = document.getElementById('results-section');
  const person = PERSON_DB[result.speaker_id] || {};
  const bs = result.bs_score;
  const decomp = result.decomposition;
  const conflict = result.conflict;
  const hypotheses = result.hypotheses;

  // ── Header ──
  document.getElementById('result-claim-quote').textContent = `"${result.claim}"`;
  document.getElementById('result-speaker-name').textContent = person.name || result.speaker_id;
  document.getElementById('result-speaker-title').textContent = person.title || '';
  const avatarEl = document.getElementById('result-speaker-avatar');
  avatarEl.textContent = person.initials || '?';
  avatarEl.style.background = `linear-gradient(135deg, ${person.color}, ${person.color}88)`;

  // ── Score ──
  const scoreNum = document.getElementById('score-number');
  scoreNum.textContent = '0';
  let scoreAnim = 0;
  const scoreTarget = bs.score;
  const scoreStep = () => {
    scoreAnim = Math.min(scoreAnim + 3, scoreTarget);
    scoreNum.textContent = scoreAnim;
    if (scoreAnim < scoreTarget) requestAnimationFrame(scoreStep);
  };
  requestAnimationFrame(scoreStep);

  const { text: labelText, cls: labelCls } = getScoreLabel(bs.score);
  const labelEl = document.getElementById('score-label');
  labelEl.textContent = labelText;
  labelEl.className = `score-label-pill ${labelCls}`;

  // ── Gauge ──
  const canvas = document.getElementById('results-gauge-canvas');
  setTimeout(() => drawGauge(canvas, bs.score, true), 100);

  // ── Score breakdown bars ──
  const breakdown = [
    { id: 'bar-connection', val: bs.connection_rate, max: 40, label: 'Conflict\nRate' },
    { id: 'bar-directness', val: bs.directness, max: 30, label: 'Direct-\nness' },
    { id: 'bar-magnitude', val: bs.magnitude, max: 20, label: 'Magnitude' },
    { id: 'bar-extremity', val: bs.extremity_score, max: 10, label: 'Extremity' },
  ];

  breakdown.forEach(b => {
    const fill = document.getElementById(b.id);
    if (fill) {
      const pct = (b.val / b.max) * 100;
      setTimeout(() => { fill.style.height = pct + '%'; }, 200);
    }
    const valEl = document.getElementById(b.id + '-val');
    if (valEl) valEl.textContent = `${Math.round(b.val)}/${b.max}`;
  });

  // ── Decomposition ──
  document.getElementById('decomp-action').textContent = decomp.implied_action;
  document.getElementById('decomp-domain').textContent = decomp.domain;
  document.getElementById('decomp-extremity-val').textContent = `${decomp.extremity}/10`;
  document.getElementById('decomp-extremity-reason').textContent = decomp.extremity_reason;
  const extFill = document.getElementById('extremity-fill');
  if (extFill) setTimeout(() => { extFill.style.width = (decomp.extremity / 10 * 100) + '%'; }, 300);

  // ── Hypotheses ──
  const hypContainer = document.getElementById('hypotheses-list');
  hypContainer.innerHTML = '';

  hypotheses.forEach(hyp => {
    const match = conflict.matches.find(m => m.hypothesis === hyp.id) || {};
    const conn = match.connection || 'NONE';
    const icon = conn === 'DIRECT' ? '✅' : conn === 'INDIRECT' ? '⚠️' : '❌';
    const matchCls = conn === 'DIRECT' ? 'connected-direct' : conn === 'INDIRECT' ? 'connected-indirect' : 'connected-none';
    const badgeCls = conn === 'DIRECT' ? 'match-direct' : conn === 'INDIRECT' ? 'match-indirect' : 'match-none';

    // Parse chain arrows (escape first, then replace arrow character)
    const chainFormatted = escapeHTML(hyp.chain).replace(/→/g, '<span class="hypothesis-chain-arrow">→</span>');

    const item = document.createElement('div');
    item.className = `hypothesis-item ${matchCls}`;
    item.innerHTML = `
      <div class="hypothesis-icon">${icon}</div>
      <div class="hypothesis-content">
        <div class="hypothesis-id">
          ${escapeHTML(hyp.id)}
          <span class="match-badge ${badgeCls}">${escapeHTML(conn)}</span>
          ${match.confidence ? `<span style="font-size:0.62rem;color:var(--text-3)">${escapeHTML(match.confidence)} confidence</span>` : ''}
        </div>
        <div class="hypothesis-chain">${chainFormatted}</div>
        ${match.explanation ? `<div class="hypothesis-explanation">${escapeHTML(match.explanation)}</div>` : ''}
      </div>
    `;
    hypContainer.appendChild(item);
  });

  // ── Doubt reasons ──
  const doubtList = document.getElementById('doubt-list');
  doubtList.innerHTML = '';
  (conflict.doubt_reasons || []).forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'concern-item';
    li.innerHTML = `<span class="concern-bullet doubt-bullet">${i + 1}</span><span>${escapeHTML(r)}</span>`;
    doubtList.appendChild(li);
  });

  // ── Fair points ──
  const fairList = document.getElementById('fair-list');
  fairList.innerHTML = '';
  (conflict.fair_points || []).forEach((r, i) => {
    const li = document.createElement('li');
    li.className = 'concern-item';
    li.innerHTML = `<span class="concern-bullet fair-bullet">${i + 1}</span><span>${escapeHTML(r)}</span>`;
    fairList.appendChild(li);
  });

  // ── Verdict ──
  document.getElementById('verdict-text').textContent = conflict.bs_summary;

  // ── Clear any prior mock notice ──
  document.querySelector('.mock-data-notice')?.remove();

  // ── Show ──
  section.classList.add('visible');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// LOADING ANIMATION
// ============================================================
function simulateLoading(callback) {
  const steps = ['step-decompose', 'step-hypothesize', 'step-match', 'step-score'];
  let current = 0;

  function nextStep() {
    if (current > 0) {
      const prev = document.getElementById(steps[current - 1]);
      if (prev) {
        prev.classList.remove('active');
        prev.classList.add('done');
      }
    }
    if (current < steps.length) {
      const curr = document.getElementById(steps[current]);
      if (curr) curr.classList.add('active');
      current++;
      setTimeout(nextStep, ANIMATION.LOADING_STEP_DELAY);
    } else {
      setTimeout(callback, 200);
    }
  }

  nextStep();
}

// ============================================================
// FORM SUBMIT
// ============================================================
async function handleSubmit() {
  const claimText = document.getElementById('claim-text').value.trim();
  const speakerId = document.getElementById('speaker-select').value;

  if (!claimText || claimText.length > API.MAX_CLAIM_LENGTH) {
    document.getElementById('claim-text').focus();
    document.getElementById('claim-text').style.borderColor = 'var(--accent)';
    setTimeout(() => document.getElementById('claim-text').style.borderColor = '', 1500);
    return;
  }

  if (!speakerId) {
    document.getElementById('speaker-select').focus();
    return;
  }

  // Show loading
  const btn = document.getElementById('analyze-btn');
  const loading = document.getElementById('loading-state');
  const resultsSection = document.getElementById('results-section');

  btn.disabled = true;
  loading.classList.add('active');
  resultsSection.classList.remove('visible');

  // Reset loading steps
  document.querySelectorAll('.loading-step').forEach(s => s.classList.remove('active', 'done'));

  const loadingText = document.getElementById('loading-status-text');
  const statusMessages = [
    'Decomposing the claim...',
    'Generating conflict hypotheses...',
    'Matching financial ties...',
    'Calculating BS percentile...',
  ];
  let msgIdx = 0;
  const msgInterval = setInterval(() => {
    if (msgIdx < statusMessages.length) {
      loadingText.textContent = statusMessages[msgIdx++];
    }
  }, ANIMATION.LOADING_STEP_DELAY);

  simulateLoading(async () => {
    clearInterval(msgInterval);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT_MS);

    try {

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          claim_text: claimText,
          speaker_id: speakerId
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const apiResult = await response.json();
      
      btn.disabled = false;
      loading.classList.remove('active');

      // Adapt backend response keys to the frontend's expected format
      if (apiResult.components) {
        // Backend hypotheses have {hypothesis, connection, confidence, explanation}
        // Frontend expects hypotheses with {id, chain} and conflict.matches with {hypothesis, connection, confidence, explanation}
        const rawHyps = apiResult.hypotheses || [];
        const adaptedHyps = rawHyps.map(h => ({
          id: h.hypothesis,
          chain: h.explanation || '',
        }));
        const adaptedMatches = rawHyps.map(h => ({
          hypothesis: h.hypothesis,
          connection: h.connection || 'NONE',
          confidence: h.confidence || '',
          explanation: h.explanation || '',
        }));

        renderResults({
          claim: claimText,
          speaker_id: speakerId,
          bs_score: {
            score: apiResult.finalScore || 0,
            connection_rate: apiResult.components.connection_rate || 0,
            directness: apiResult.components.directness || 0,
            magnitude: apiResult.components.magnitude || 0,
            extremity_score: apiResult.components.extremity_score || 0
          },
          decomposition: apiResult.decomposition || {},
          hypotheses: adaptedHyps,
          conflict: {
            matches: adaptedMatches,
            doubt_reasons: apiResult.doubtReasons || [],
            fair_points: apiResult.fairPoints || [],
            bs_summary: apiResult.bsSummary || 'Live analysis complete.',
          }
        });
      } else {
        // Direct pass-through
        renderResults(apiResult);
      }

    } catch (err) {
      clearTimeout(timeoutId);
      console.warn("Live API failed. Falling back to mock data.", err);

      // Fallback: Find matching mock result
      const matchingMock = SAMPLE_CLAIMS.find(
        sc => sc.speaker === speakerId && sc.claim.toLowerCase() === claimText.toLowerCase()
      );

      btn.disabled = false;
      loading.classList.remove('active');

      if (matchingMock && MOCK_RESULTS[matchingMock.id]) {
        renderResults(MOCK_RESULTS[matchingMock.id]);
      } else {
        // Fallback: use the closest mock result for any input by the same speaker
        const fallbackKey = Object.keys(MOCK_RESULTS).find(k =>
          MOCK_RESULTS[k].speaker_id === speakerId
        );
        if (fallbackKey) {
          const adapted = {
            ...MOCK_RESULTS[fallbackKey],
            claim: claimText,
          };
          renderResults(adapted);
        } else {
          // No available mock — show notice
          renderResults({
            claim: claimText,
            speaker_id: speakerId,
            decomposition: {
              implied_action: 'Analysis pending (connect to live API)',
              domain: 'N/A',
              extremity: 5,
              extremity_reason: 'Demo mode — custom claims require the live backend',
            },
            hypotheses: [],
            conflict: { matches: [], doubt_reasons: ['Live API connection failed'], fair_points: [], bs_summary: 'Could not connect to Python backend.' },
            bs_score: { score: 0, connection_rate: 0, directness: 0, magnitude: 0, extremity_score: 0 },
          });
        }
      }

      // Show mock data notice so users know this isn't live analysis
      showMockNotice();
    }
  });
}

// ============================================================
// MOCK DATA NOTICE
// ============================================================
function showMockNotice() {
  // Remove any existing notice
  document.querySelector('.mock-data-notice')?.remove();

  const banner = document.getElementById('bs-reasoning-banner');
  if (!banner) return;
  const notice = document.createElement('div');
  notice.className = 'mock-data-notice';
  notice.textContent = 'Note: Live API unavailable. Showing pre-computed demo results.';
  banner.parentNode.insertBefore(notice, banner);
}

// ============================================================
// HEADLINE TICKER
// ============================================================
function startTicker() {
  const ticker = document.getElementById('hero-ticker-text');
  if (!ticker) return;

  const headlines = SAMPLE_CLAIMS.map(sc => {
    const p = PERSON_DB[sc.speaker];
    return `"${sc.claim}" — ${p?.name} (${p?.primary_company || sc.speaker})`;
  });

  let idx = 0;
  function cycle() {
    ticker.style.opacity = '0';
    setTimeout(() => {
      ticker.textContent = headlines[idx % headlines.length];
      idx++;
      ticker.style.opacity = '1';
    }, ANIMATION.TICKER_FADE);
  }

  ticker.style.transition = `opacity ${ANIMATION.TICKER_FADE / 1000}s`;
  cycle();
  setInterval(cycle, ANIMATION.TICKER_INTERVAL);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  populateSpeakerSelect();
  renderSpeakerCards();
  renderSamplePills();
  startTicker();

  document.getElementById('analyze-btn').addEventListener('click', handleSubmit);
  document.getElementById('claim-text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.metaKey) handleSubmit();
  });

  // Hero CTA scroll
  document.getElementById('hero-cta')?.addEventListener('click', () => {
    document.getElementById('analyzer').scrollIntoView({ behavior: 'smooth' });
  });

  // Scroll nav shadow
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(7, 7, 14, 0.95)';
    } else {
      nav.style.background = 'rgba(7, 7, 14, 0.85)';
    }
  });
});
