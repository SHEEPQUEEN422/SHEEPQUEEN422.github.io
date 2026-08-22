/* Data Source */
const papers = [
    {
        previewSrc: "./assets/astro.jpg",
        title: "Reflo — Behavioral AI Scheduling System",
        authors: [{ name: "Helen Hui", lead: true }],
        conference: "2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422" },
        ],
        summary: "Designed a 4-layer behavioral model (Trait, Rhythm, State, Context) and 28-item onboarding assessment. Built adaptive recommendation logic combining rule-based scoring and Thompson Sampling.",
        new: true,
        category: "AI",
    },
    {
        previewSrc: "./assets/rsrd_preview.mp4",
        title: "Infinitus AI Voice Agent Personas",
        authors: [{ name: "Helen Hui", lead: true }],
        conference: "Jun 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422" },
        ],
        summary: "Built 3 GPT-4o & ElevenLabs voice-agent personas and co-designed a within-subject experiment (~50 participants) evaluating conversational style, user engagement, and emotional connection.",
        new: true,
        category: "Behavior",
    },
    {
        previewSrc: "./assets/ipc-splash.jpg",
        title: "Job Scam Classifier",
        authors: [{ name: "Helen Hui", lead: true }],
        conference: "2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422" },
        ],
        summary: "Led development of fraud-detection models on 18K job postings with engineered TF-IDF features. XGBoost achieved 0.957 AUC and 80% fraud recall.",
        new: true,
        category: "ML",
    },
    {
        previewSrc: "./assets/showdata.png",
        title: "Statistical Replication & Predictive Modeling",
        authors: [{ name: "Helen Hui", lead: true }],
        conference: "2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422" },
        ],
        summary: "Replicated survey experiment with 1,009 respondents, built alternative ordinal-logit specifications, and evaluated model performance using AIC, log-likelihood, and marginal effects.",
        new: false,
        category: "Analytics",
    },
    {
        previewSrc: "./assets/depositphotos_318276858-stock-illustration-music-notes-icon-musical-key.jpg",
        title: "TikTok Trend & Script Recommendation Tool",
        authors: [{ name: "Helen Hui", lead: true }],
        conference: "2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422" },
        ],
        summary: "Integrated Apify TikTok scraping API to analyze trending content at scale and built an AI-assisted workflow converting emerging trends into script recommendations.",
        new: false,
        category: "AI",
    },
    {
        previewSrc: "./assets/staxray.png",
        title: "Behavioral Impression Updating Analysis",
        authors: [{ name: "Helen Hui", lead: true }],
        conference: "May 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422" },
        ],
        summary: "Analyzed 6 large behavioral datasets (1K+ rows) in R using RSA, Pearson correlation, and t-tests, identifying nonverbal signals as key drivers of impression updating.",
        new: false,
        category: "Behavior",
    },
];

/* Logic: Calculate counts and update buttons */
function updateCategoryCounts() {
    const counts = { ALL: papers.length };

    // Calculate counts
    papers.forEach(p => {
        const cat = p.category;
        counts[cat] = (counts[cat] || 0) + 1;
    });

    // Update buttons
    const buttons = document.querySelectorAll("#category-filter button");
    buttons.forEach(btn => {
        const onClickAttr = btn.getAttribute("onclick");
        if (onClickAttr) {
            const match = onClickAttr.match(/'([^']+)'/);
            if (match && match[1]) {
                const catCode = match[1];
                const count = counts[catCode] || 0;
                const originalText = btn.innerText.replace(/\s\(\d+\)$/, '');
                btn.innerText = `${originalText} (${count})`;
            }
        }
    });
}

/* Rendering Logic */
function generatePaperList() {
    const list = document.getElementById("paper-list");
    list.innerHTML = "";

    papers.forEach(paper => {
        const div = document.createElement("div");
        // Add reveal class to cards so they animate too
        div.className = `project-card category-${paper.category.toLowerCase()} reveal`;

        // Video Logic
        let visualHtml = '';
        if (paper.previewSrc.endsWith(".mp4")) {
            const is2048 = paper.previewSrc.includes("2048");

            if (is2048) {
                visualHtml = `
           <video 
             class="card-visual" 
             src="${paper.previewSrc}" 
             muted 
             playsinline 
             loop 
             onmouseover="this.play()" 
             onmouseout="this.pause()"
             onclick="openVideoModal('${paper.previewSrc}')"
           ></video>`;
            } else {
                visualHtml = `
           <video 
             class="card-visual" 
             src="${paper.previewSrc}" 
             muted 
             playsinline 
             loop 
             autoplay
             onclick="openVideoModal('${paper.previewSrc}')"
           ></video>`;
            }
        } else {
            visualHtml = `<img class="card-visual" src="${paper.previewSrc}" alt="${paper.title}" onclick="openImageModal('${paper.previewSrc}')">`;
        }

        const linksHtml = paper.links.map(l => `<a href="${l.url}" target="_blank">${l.text} &rarr;</a>`).join("");
        const newBadge = paper.new ? `<span class="new-badge">NEW</span>` : '';

        div.innerHTML = `
      ${visualHtml}
      <div class="card-content">
        <div class="card-tag">${paper.category}</div>
        <div class="card-title">${paper.title}${newBadge}</div>
        <div class="card-summary">${paper.summary}</div>
        <div class="card-links">${linksHtml}</div>
      </div>
    `;
        list.appendChild(div);
    });
}

function filterCategory(cat) {
    document.querySelectorAll("#category-filter button").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");

    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
        if (cat === 'ALL' || card.classList.contains(`category-${cat.toLowerCase()}`)) {
            card.style.display = 'flex';
            // Re-trigger animation for filtered items if needed, or leave as is
        } else {
            card.style.display = 'none';
        }
    });
}

function copyEmail(e) {
    e.preventDefault();
    const email = "sheepqueen422@gmail.com";
    const btn = document.getElementById("email-btn");
    const btnText = document.getElementById("email-text");

    navigator.clipboard.writeText(email).then(() => {
        btn.classList.add("success");
        const originalText = btnText.innerText;
        btnText.innerText = "Copied!";
        setTimeout(() => {
            btn.classList.remove("success");
            btnText.innerText = originalText;
        }, 2000);
    });
}

function openVideoModal(src) {
    const modal = document.getElementById("video-modal");
    const player = document.getElementById("video-modal-player");
    player.src = src;
    modal.style.display = "flex";
    player.muted = false;
    player.play().catch(e => console.log(e));
}
function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    document.getElementById("video-modal-player").pause();
    modal.style.display = "none";
}
function openImageModal(src) {
    const modal = document.getElementById("image-modal");
    document.getElementById("image-modal-content").src = src;
    modal.style.display = "flex";
}
function closeImageModal() {
    document.getElementById("image-modal").style.display = "none";
}

// --- 核心：Observer 逻辑 ---
function observeElements() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.02,
        rootMargin: "0px 0px -20px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    generatePaperList(); // 先生成内容
    updateCategoryCounts();
    observeElements(); // 再监听滚动
});