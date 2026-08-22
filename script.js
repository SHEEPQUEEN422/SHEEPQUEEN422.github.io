/* Data Source */
const papers = [
    {
        previewSrc: "./assets/depositphotos_318276858-stock-illustration-music-notes-icon-musical-key.jpg",
        title: "Fine-Tuning LLaMA3-8B with QLoRA for Music",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Mar 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/music_generation" },
            { text: "Demo", url: "https://drive.google.com/file/d/18PJz153zofdmdfIRK4FeDz8xF0cWOpF3/view" },
        ],
        summary: "Fine-tuned LLaMA3-8B using QLoRA for melody-to-accompaniment generation. Achieved strong performance: 0.62 loss / 1.85 perplexity.",
        new: true,
        category: "LLM",
    },
    {
        previewSrc: "./assets/Beethoven.jpg",
        title: "Composer Classification & Sequence Prediction",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Mar 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/Composer-Classification-and-Next-Sequence-Prediction" },
        ],
        summary: "Applied PCA and XGBoost on 1,210 MIDI files. LightGBM achieved the highest average validation accuracy of 87.69%.",
        new: true,
        category: "ML",
    },
    {
        previewSrc: "./assets/triton.png",
        title: "TritonTube — Distributed Video Platform",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Mar 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/Tritontube" },
        ],
        summary: "Scalable video platform using Go, gRPC, and consistent hashing. Features MPEG-DASH playback and distributed storage.",
        new: true,
        category: "SWE",
    },
    {
        previewSrc: "./assets/2048.mp4",
        title: "AI 2048 Player",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Jan 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/2048AI" },
        ],
        summary: "Developed an AI to play 2048 using the Expectimax algorithm, achieving high scores through strategic planning.",
        new: false,
        category: "RL",
    },
    {
        previewSrc: "./assets/av2_motion_forecasting.png",
        title: "Trajectory Prediction with LSTM",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Mar 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/251final" },
        ],
        summary: "Multi-agent trajectory prediction using Argoverse 2. Achieved best performance with a two-layer LSTM enhanced by neighborhood aggregation.",
        new: false,
        category: "DL",
    },
    {
        previewSrc: "./assets/lstmmvo.png",
        title: "Crypto Portfolio Optimization (LSTM & MPT)",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Jan 2025",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/Multi-Crypto-Investment-Portfolios" },
            { text: "Report", url: "https://drive.google.com/file/d/15DpqUIzlJGGnx6x8Zoadb_otJBPP6Ks3/view?usp=sharing" },
        ],
        summary: "Combined LSTM-based return forecasting with Mean-Variance Optimization to optimize multi-crypto investment strategies.",
        new: false,
        category: "DL",
    },
    {
        previewSrc: "./assets/showdata.png",
        title: "LoRA Fine-Tuning Qwen2 & Yi",
        authors: [{ name: "Zheng Yuan", lead: true }, { name: "Yiyang Zheng" }, { name: "Yunzhe Li" }],
        conference: "Jul 2024",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/finetune" },
        ],
        summary: "Fine-tuned Qwen2-72B and Yi-1.5-34B. Implemented consistency fallback strategy reverting to CoT prompting when inconsistencies arise.",
        new: false,
        category: "LLM",
    },
    {
        previewSrc: "./assets/dl.mp4",
        title: "Deep Learning Training Platform",
        authors: [{ name: "Zheng Yuan" }],
        conference: "Jan 2024",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/DLplatform" },
        ],
        summary: "Full-stack platform (Django/TensorFlow) supporting training/inference for 17 classic models. Includes intent extraction UI.",
        new: false,
        category: "DL",
    },
    {
        previewSrc: "./assets/cancer.mp4",
        title: "3D Medical Segmentation with Diffusion",
        authors: [{ name: "Zheng Yuan", lead: true }, { name: "Yiyang Zheng" }, { name: "Pengxiang Li" }],
        conference: "Jan 2024",
        links: [
            { text: "Git repo", url: "https://github.com/SHEEPQUEEN422/3D-Medical-Segmentation-with-Diffusion-Model" },
        ],
        summary: "Generated 3D CT scans using Medical Diffusion for few-shot learning. Improved Dice score from 0.81 to 0.85 using U-Net.",
        new: false,
        category: "DL",
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
    const email = "yuanzzzhg@gmail.com";
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