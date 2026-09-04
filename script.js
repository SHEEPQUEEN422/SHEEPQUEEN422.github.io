/* ============================================================
   Selected Work
   ============================================================ */
const papers = [
    {
        cover: "./assets/covers/reflo.jpg",
        accent: "a",
        title: "Reflo — Assessment Instrument & Validity Pipeline",
        conference: "2025 · TypeScript / Next.js, Supabase, OpenAI API",
        links: [
            { text: "GitHub", url: "https://github.com/SHEEPQUEEN422/Reflo" },
        ],
        summary: "A 28-item instrument and the derivation logic mapping responses into a four-dimension profile, with Thompson Sampling updating recommendations from downstream feedback. The part I care about is the layer underneath: attention checks, straight-lining and extreme-response ratios, MAD-based robust z bounds, and two-window drift detection, all running before anything is scored. Field definitions and transformations are documented so any reported value can be traced back to its inputs.",
        new: true,
        category: "Measurement",
    },
    {
        cover: "./assets/covers/scam.jpg",
        accent: "b",
        title: "Detecting Scams in Job Postings",
        conference: "2025 · R, XGBoost · Lead author, with Y. Dong, E. Garza-Elorduy, E. Han",
        links: [
            { text: "Paper (PDF)", url: "./assets/papers/job-scam-classifier.pdf" },
        ],
        summary: "Built an analytic dataset from 18,000 unstructured job postings with inconsistent schemas and heavy missingness — where missingness itself turned out to be predictive. Engineered structured, missingness, and TF-IDF features, then compared L1-regularized logistic regression against XGBoost under cross-validation (0.957 AUC, 80% recall). The write-up frames the precision/recall trade-off as an operating decision rather than a metric to maximize.",
        new: true,
        category: "ML",
    },
    {
        cover: "./assets/covers/replication.jpg",
        accent: "c",
        title: "Statistical Replication of Support for Marginalized Groups with Distributive Fairness",
        conference: "2025 · R · with E. Han · replication of Findor et al. (2022)",
        links: [
            { text: "Paper (PDF)", url: "./assets/papers/social-housing-replication.pdf" },
        ],
        summary: "Replicated a 1,009-respondent survey experiment on support for social housing across control, equality, reciprocity, and need framings. Specified competing ordinal logit models and compared them on AIC, log-likelihood, cross-validated accuracy, Kappa, and marginal effects, to test whether the original conclusions survived alternative specifications rather than assuming they would.",
        new: false,
        category: "Experiment",
    },
    {
        cover: "./assets/covers/voice-agent.jpg",
        accent: "d",
        title: "Strategies for Building Trust with Automated Agent Systems",
        conference: "Apr 2025 · Infinitus Systems · with M. Dutton · within-subject, n≈50",
        links: [
            { text: "Paper (PDF)", url: "./assets/papers/voice-agent-study.pdf" },
        ],
        summary: "A within-subject controlled study of how conversational style affects engagement and emotional connection. I built two of the three standardized GPT-4o / ElevenLabs conditions used to isolate the manipulated variable, and worked with the team through the analysis: two-way ANOVA, Tukey HSD, and effect sizes (+0.69 and +0.45 over comparison conditions). Findings were presented with their limitations stated.",
        new: false,
        category: "Experiment",
    },
    {
        label: "Impressions",
        accent: "e",
        title: "Behavioral Drivers of Impression Updating",
        conference: "Feb–May 2025 · IMPACT Lab, UC San Diego · R",
        links: [],
        summary: "Analyzed six behavioral datasets (1,000+ observations each) using representational similarity analysis, Pearson correlation, binomial tests, and two-sided t-tests, modeling how trait impressions shift across multimodal behavioral and nonverbal features. Nonverbal signals were the primary drivers of impression updating.",
        new: false,
        category: "Experiment",
    },
    {
        label: "Settlyfe",
        accent: "f",
        title: "Settlyfe — Requirements from Ambiguous User Input",
        conference: "2025–2026 · cross-platform mobile app",
        links: [],
        note: "Source is in a private company repository.",
        summary: "Ran ~16 stakeholder interviews and a ~50-response survey on housing needs, then worked with the Tech Lead to convert conflicting qualitative input into a defined, prioritized scope, and shipped UI iterations against it. A competitive analysis of 20+ PropTech products across features, users, pricing, and business model drove the decision to narrow the initial scope.",
        new: false,
        category: "Product",
    },
    {
        label: "Content",
        accent: "g",
        title: "Trend-to-Script Recommendation Pipeline",
        conference: "2025 · Python, Apify API",
        links: [],
        note: "Built as a contributor on a collaborator's repository.",
        summary: "An API-driven collection pipeline gathering short-form content engagement data at scale, and an AI-assisted workflow converting emerging trend signals into concrete script recommendations for non-technical users.",
        new: false,
        category: "Product",
    },
    {
        label: "DMV",
        accent: "h",
        title: "DMV Appointment Bot",
        conference: "2025 · Python, Playwright",
        links: [
            { text: "GitHub", url: "https://github.com/SHEEPQUEEN422/dmv-bot" },
        ],
        summary: "A Playwright automation that polls DMV appointment availability within a date range, selects matching open slots, and completes the booking flow. Built because the manual version was a recurring waste of time.",
        new: false,
        category: "Product",
    },
];

/* ============================================================
   Hero demo — what validity screening actually removes
   ============================================================ */
const DEMO_ROWS = [
    { id: "R1", a: [4, 5, 2, 4, 3] },
    { id: "R2", a: [3, 3, 3, 3, 3] },   // straight-lining + fails attention check
    { id: "R3", a: [5, 4, 2, 5, 4] },
    { id: "R4", a: [5, 5, 5, 5, 5] },   // straight-lining, extreme, fails check
    { id: "R5", a: [2, 3, 2, 3, 2] },
    { id: "R6", a: [4, 4, 2, 3, 4] },
    { id: "R7", a: [1, 1, 1, 1, 1] },   // straight-lining, extreme, fails check
    { id: "R8", a: [3, 4, 2, 4, 3] },
];
const ATTN_INDEX = 2, ATTN_EXPECTED = 2;
let screened = false;

function flagsFor(r) {
    const f = [];
    if (r.a[ATTN_INDEX] !== ATTN_EXPECTED) f.push("attention check");
    if (new Set(r.a).size === 1) f.push("straight-lining");
    const ext = r.a.filter(v => v === 1 || v === 5).length / r.a.length;
    if (ext >= 0.8) f.push("extreme responding");
    return f;
}
function scoreOf(r) {
    const keep = r.a.filter((_, i) => i !== ATTN_INDEX);
    return keep.reduce((s, v) => s + v, 0) / keep.length;
}

function renderDemo() {
    const t = document.getElementById("demo-table");
    if (!t) return;
    let html = "<thead><tr><th></th><th>Q1</th><th>Q2</th><th>Q3 <em>check</em></th><th>Q4</th><th>Q5</th><th>Status</th></tr></thead><tbody>";
    let kept = [];
    DEMO_ROWS.forEach(r => {
        const f = flagsFor(r);
        const bad = f.length > 0;
        if (!bad) kept.push(r);
        const rowCls = screened && bad ? "row-flagged" : "";
        html += `<tr class="${rowCls}"><td class="rid">${r.id}</td>`;
        r.a.forEach((v, i) => {
            const cls = (i === ATTN_INDEX && screened && v !== ATTN_EXPECTED) ? "cell-bad" : "";
            html += `<td class="${cls}">${v}</td>`;
        });
        html += `<td class="status">${screened ? (bad ? f[0] : "kept") : "—"}</td></tr>`;
    });
    html += "</tbody>";
    t.innerHTML = html;

    const pool = screened ? kept : DEMO_ROWS;
    const mean = pool.reduce((s, r) => s + scoreOf(r), 0) / pool.length;
    document.getElementById("stat-n").textContent = pool.length;
    document.getElementById("stat-mean").textContent = mean.toFixed(2);
    document.getElementById("stat-flag").textContent = screened ? (DEMO_ROWS.length - kept.length) : "—";
    document.getElementById("demo-btn").textContent = screened ? "Reset" : "Run validity screen";
    document.getElementById("demo-note").innerHTML = screened
        ? `Three of eight responses carried no information — all three flat-lined, two of them at an extreme end of the scale, and all three missed the attention check. They were about to be averaged in silently. The mean moved by <strong>${Math.abs(mean - DEMO_ROWS.reduce((s, r) => s + scoreOf(r), 0) / DEMO_ROWS.length).toFixed(2)}</strong>. Illustrative data; the same checks run in <a href="https://github.com/SHEEPQUEEN422/Reflo" target="_blank">Reflo</a> before anything is scored.`
        : "Every response is currently included, and the average looks fine.";
}
function toggleScreen() { screened = !screened; renderDemo(); }

/* ============================================================
   Rendering
   ============================================================ */
function updateCategoryCounts() {
    const counts = { ALL: papers.length };
    papers.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    document.querySelectorAll("#category-filter button").forEach(btn => {
        const m = (btn.getAttribute("onclick") || "").match(/'([^']+)'/);
        if (!m) return;
        const base = btn.innerText.replace(/\s\(\d+\)$/, "");
        btn.innerText = `${base} (${counts[m[1]] || 0})`;
    });
}

function generatePaperList() {
    const list = document.getElementById("paper-list");
    if (!list) return;
    list.innerHTML = "";
    papers.forEach(p => {
        const div = document.createElement("div");
        div.className = `project-card category-${p.category.toLowerCase()} reveal`;
        const links = (p.links || []).map(l =>
            `<a href="${l.url}" target="_blank" rel="noopener">${l.text} &rarr;</a>`).join("");
        const note = p.note ? `<span class="card-note">${p.note}</span>` : "";
        div.innerHTML = `
      ${p.cover
            ? `<img class="card-visual card-cover" src="${p.cover}" alt="${p.title}" loading="lazy" onclick="openImageModal('${p.cover}')">`
            : `<div class="card-visual accent-${p.accent}"><span>${p.label}</span></div>`}
      <div class="card-content">
        <div class="card-tag">${p.category}</div>
        <div class="card-title">${p.title}${p.new ? '<span class="new-badge">NEW</span>' : ''}</div>
        <div class="card-meta">${p.conference}</div>
        <div class="card-summary">${p.summary}</div>
        <div class="card-links">${links}${note}</div>
      </div>`;
        list.appendChild(div);
    });
}

function filterCategory(cat, e) {
    document.querySelectorAll("#category-filter button").forEach(b => b.classList.remove("active"));
    if (e && e.target) e.target.classList.add("active");
    document.querySelectorAll(".project-card").forEach(card => {
        const show = cat === "ALL" || card.classList.contains(`category-${cat.toLowerCase()}`);
        card.style.display = show ? "flex" : "none";
    });
}

function copyEmail(e) {
    e.preventDefault();
    const btn = document.getElementById("email-btn");
    const btnText = document.getElementById("email-text");
    navigator.clipboard.writeText("sheepqueen422@gmail.com").then(() => {
        btn.classList.add("success");
        const original = btnText.innerText;
        btnText.innerText = "Copied!";
        setTimeout(() => { btn.classList.remove("success"); btnText.innerText = original; }, 2000);
    });
}

function openVideoModal(src) {
    const modal = document.getElementById("video-modal");
    const player = document.getElementById("video-modal-player");
    player.src = src; modal.style.display = "flex"; player.muted = false;
    player.play().catch(() => { });
}
function closeVideoModal() {
    document.getElementById("video-modal-player").pause();
    document.getElementById("video-modal").style.display = "none";
}
function openImageModal(src) {
    document.getElementById("image-modal-content").src = src;
    document.getElementById("image-modal").style.display = "flex";
}
function closeImageModal() { document.getElementById("image-modal").style.display = "none"; }

function observeElements() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add("active"); io.unobserve(en.target); }
        });
    }, { root: null, threshold: 0.02, rootMargin: "0px 0px -20px 0px" });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    renderDemo();
    generatePaperList();
    updateCategoryCounts();
    observeElements();
});

/* Ambient light follows the pointer (skipped on touch / reduced motion) */
(function () {
    const amb = document.getElementById("ambient");
    if (!amb) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let raf = null, x = 50, y = 22;
    window.addEventListener("pointermove", e => {
        x = (e.clientX / window.innerWidth) * 100;
        y = (e.clientY / window.innerHeight) * 100;
        if (raf) return;
        raf = requestAnimationFrame(() => {
            amb.style.setProperty("--mx", x + "%");
            amb.style.setProperty("--my", y + "%");
            raf = null;
        });
    }, { passive: true });
})();

/* Loupe: magnify the rendered paper covers under the cursor.
   Scoped deliberately — the small print on those pages is genuinely
   too small to read at card size. Nothing else on the page magnifies. */
(function () {
    const lens = document.getElementById("loupe");
    if (!lens) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ZOOM = 2.6;
    const R = 95;               // half of #loupe width
    let active = null, raf = null, lastEvt = null;

    function place(e) {
        const img = active;
        if (!img) return;
        const box = img.getBoundingClientRect();
        const natW = img.naturalWidth, natH = img.naturalHeight;
        if (!natW || !natH) return;

        // object-fit: cover, object-position: center 34%
        const scale = Math.max(box.width / natW, box.height / natH);
        const renderedW = natW * scale, renderedH = natH * scale;
        const cropX = (renderedW - box.width) * 0.5;
        const cropY = (renderedH - box.height) * 0.34;

        const cx = Math.min(Math.max(e.clientX - box.left, 0), box.width);
        const cy = Math.min(Math.max(e.clientY - box.top, 0), box.height);

        const sx = (cropX + cx) / scale;   // source-pixel under cursor
        const sy = (cropY + cy) / scale;

        lens.style.backgroundSize = `${natW * ZOOM}px ${natH * ZOOM}px`;
        lens.style.backgroundPosition = `${R - sx * ZOOM}px ${R - sy * ZOOM}px`;
        lens.style.left = `${e.clientX - R}px`;
        lens.style.top = `${e.clientY - R}px`;
    }

    function onMove(e) {
        lastEvt = e;
        if (raf) return;
        raf = requestAnimationFrame(() => { place(lastEvt); raf = null; });
    }

    document.addEventListener("pointerover", e => {
        const img = e.target.closest(".card-cover");
        if (!img || img === active) return;
        active = img;
        lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
        lens.classList.add("on");
        place(e);
        img.addEventListener("pointermove", onMove, { passive: true });
    });

    document.addEventListener("pointerout", e => {
        const img = e.target.closest(".card-cover");
        if (!img || (e.relatedTarget && img.contains(e.relatedTarget))) return;
        img.removeEventListener("pointermove", onMove);
        active = null;
        lens.classList.remove("on");
    });

    window.addEventListener("scroll", () => {
        if (active) { active = null; lens.classList.remove("on"); }
    }, { passive: true });
})();
