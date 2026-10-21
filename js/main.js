let currentLang = localStorage.getItem('site_lang') || 'en';
let projectsData = [];
let experienceData = [];
let skillsData = [];

const i18n = {
    en: {
        navName: "LU YUNG-CHIEH",
        navTitle: "/ BIM ENGINEER",
        navAbout: "ABOUT ME",
        navResume: "RESUME",
        navProjects: "PROJECTS",
        cardName: "LU<br>YUNG-CHIEH",
        cardTitle: "BIM ENGINEER",
        heroTitle: "Hello",
        heroSubtitle: "Here's who I am & what I do",
        btnResume: "RESUME",
        btnProjects: "PROJECTS",
        heroP1: "Graduated with a degree in Architecture from National Taiwan University of Science and Technology (NTUST), I earned my Autodesk Certified User: Revit Architecture certification during my studies.",
        heroP2: "Grounded in a solid architectural foundation, I am deeply passionate about Building Information Modeling (BIM).",
        projectsHeaderTitle: "Projects",
        projectsHeaderSubtitle: "A showcase of architectural and BIM projects led and crafted by me.",
        resumeHeaderTitle: "Resume",
        resumeHeaderSubtitle: "Equipped with diverse internship experience and proven expertise in cross-functional communication and coordination.",
        resumeSkillsHeading: "Skills & Expertise",
        skillCat1: "Methodologies",
        skillCat2: "Tools & Software",
        skillCat3: "Certifications",
        resumeExpHeading: "Work Experience",
        footerCopy: "© 2026 LU YUNG-CHIEH. All rights reserved.",
        footerTag: "Designed with Sage Green accent & Asymmetric layout."
    },
    zh: {
        navName: "盧泳潔 Lumi",
        navTitle: "/ BIM 工程師",
        navAbout: "關於我",
        navResume: "履歷",
        navProjects: "作品集",
        cardName: "盧泳潔<br><span style='font-size:1.1rem; font-weight:600;'>Lumi</span>",
        cardTitle: "BIM 工程師",
        heroTitle: "你好",
        heroSubtitle: "這是我的自我介紹與專業領域",
        btnResume: "查看履歷",
        btnProjects: "瀏覽作品",
        heroP1: "畢業於國立臺灣科技大學建築系，並於在學期間取得 Autodesk Certified User: Revit Architecture 專業認證。",
        heroP2: "我專注於 Revit 模型建構與 BIM 實務應用，擅長建構結構清晰、精準且符合實務需求的 3D 模型與圖資。",
        projectsHeaderTitle: "作品集",
        projectsHeaderSubtitle: "由我主導發想與專注設計的建築與 BIM 專案作品。",
        resumeHeaderTitle: "個人履歷",
        resumeHeaderSubtitle: "具備多樣化實習經歷及跨團隊溝通協調之豐富實戰經驗。",
        resumeSkillsHeading: "專業技能",
        skillCat1: "管理方法論",
        skillCat2: "管理工具",
        skillCat3: "專業證照",
        resumeExpHeading: "工作經歷",
        footerCopy: "© 2026 盧泳潔 Lumi. 保留所有權利。",
        footerTag: "採用鼠尾草綠點綴與雙層不對稱美學設計。"
    }
};

// 載入 JSON 資料
async function initSite() {
    const pageType = document.body.dataset.page;

    try {
        if (pageType === 'projects') {
            const res = await fetch('data/projects.json');
            projectsData = await res.json();
        } else if (pageType === 'resume') {
            const [expRes, skillsRes] = await Promise.all([
                fetch('data/experience.json'),
                fetch('data/skills.json')
            ]);
            experienceData = await expRes.json();
            skillsData = await skillsRes.json();
        }
    } catch (err) {
        console.error("載入 JSON 資料失敗:", err);
    }

    renderUI();
}

function renderUI() {
    const txt = i18n[currentLang];

    // 通用 Navbar & Footer
    if(document.getElementById('nav-name')) document.getElementById('nav-name').textContent = txt.navName;
    if(document.getElementById('nav-title')) document.getElementById('nav-title').textContent = txt.navTitle;
    if(document.getElementById('nav-about')) document.getElementById('nav-about').textContent = txt.navAbout;
    if(document.getElementById('nav-resume')) document.getElementById('nav-resume').textContent = txt.navResume;
    if(document.getElementById('nav-projects')) document.getElementById('nav-projects').textContent = txt.navProjects;
    if(document.getElementById('footer-copy')) document.getElementById('footer-copy').innerHTML = txt.footerCopy;
    if(document.getElementById('footer-tag')) document.getElementById('footer-tag').innerHTML = txt.footerTag;

    // 語言按鈕狀態
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.innerHTML = currentLang === 'en' 
            ? `<span class="active-lang">EN</span> | <span>中文</span>`
            : `<span>EN</span> | <span class="active-lang">繁中</span>`;
    }

    const pageType = document.body.dataset.page;

    // About Me 頁面渲染
    if (pageType === 'about') {
        if(document.getElementById('card-name')) document.getElementById('card-name').innerHTML = txt.cardName;
        if(document.getElementById('card-title')) document.getElementById('card-title').textContent = txt.cardTitle;
        if(document.getElementById('hero-title')) document.getElementById('hero-title').textContent = txt.heroTitle;
        if(document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').textContent = txt.heroSubtitle;
        if(document.getElementById('btn-resume')) document.getElementById('btn-resume').textContent = txt.btnResume;
        if(document.getElementById('btn-projects')) document.getElementById('btn-projects').textContent = txt.btnProjects;
        if(document.getElementById('hero-p1')) document.getElementById('hero-p1').textContent = txt.heroP1;
        if(document.getElementById('hero-p2')) document.getElementById('hero-p2').textContent = txt.heroP2;
    }

    // Projects 頁面渲染
if (pageType === 'projects') {
    if (document.getElementById('projects-header-title')) {
        document.getElementById('projects-header-title').textContent = txt.projectsHeaderTitle;
    }
    if (document.getElementById('projects-header-subtitle')) {
        document.getElementById('projects-header-subtitle').textContent = txt.projectsHeaderSubtitle;
    }
    
    const container = document.getElementById('full-projects-container');
    
    // 加上 Array.isArray 防呆，確保資料存在且為陣列格式
    if (container && Array.isArray(projectsData) && projectsData.length > 0) {
        container.innerHTML = projectsData.map(p => {
            // 處理多語系文字與預設圖片防呆
            const titleText = p.title ? (p.title[currentLang] || p.title.en || '') : '';
            const categoryText = p.category ? (p.category[currentLang] || p.category.en || '') : '';
            const descText = p.description ? (p.description[currentLang] || p.description.en || '') : '';
            const linkText = p.linkText ? (p.linkText[currentLang] || p.linkText.en || 'View Project') : 'View Project';
            const imgSrc = p.image || 'https://placehold.co/600x400?text=Project+Image';

            return `
                <article class="project-card">
                    <div class="project-img-wrapper">
                        <img class="project-img" src="${imgSrc}" alt="${titleText}" loading="lazy">
                    </div>
                    <div class="project-content">
                        ${categoryText ? `<span class="project-tag">${categoryText}</span>` : ''}
                        <h3 class="project-title">${titleText}</h3>
                        <p class="project-desc">${descText}</p>
                        <div>
                            <a href="${p.linkUrl || '#'}" class="link-btn" target="_blank" rel="noopener noreferrer">
                                ${linkText} &rarr;
                            </a>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }
}

    // Resume 頁面渲染
    if (pageType === 'resume') {
        if(document.getElementById('resume-header-title')) document.getElementById('resume-header-title').textContent = txt.resumeHeaderTitle;
        if(document.getElementById('resume-header-subtitle')) document.getElementById('resume-header-subtitle').textContent = txt.resumeHeaderSubtitle;
        if(document.getElementById('resume-skills-heading')) document.getElementById('resume-skills-heading').textContent = txt.resumeSkillsHeading;
        if(document.getElementById('resume-exp-heading')) document.getElementById('resume-exp-heading').textContent = txt.resumeExpHeading;

        // 渲染左側：Skills & Expertise (來自 data/skills.json)
        const skillsContainer = document.getElementById('skills-list-container');
        if (skillsContainer && skillsData.length > 0) {
            skillsContainer.innerHTML = skillsData.map(group => `
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.9rem; margin-bottom: 0.8rem; text-transform: uppercase; color: var(--color-text-muted);">
                        ${group.category[currentLang]}
                    </h4>
                    <ul class="resume-skills-list">
                        ${group.items.map(item => `<li class="skill-tag">${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }

        // 渲染右側：Work Experience (來自 data/experience.json)
        const expContainer = document.getElementById('experience-list-container');
        if (expContainer && experienceData.length > 0) {
            expContainer.innerHTML = experienceData.map(exp => `
                <div class="resume-item">
                    <div class="resume-date">${exp.date}</div>
                    <h3 class="resume-role">${exp.role[currentLang]}</h3>
                    <p class="resume-company">${exp.company}</p>
                    <p style="font-size: 0.9rem; color: var(--color-text-muted);">${exp.desc[currentLang]}</p>
                </div>
            `).join('');
        }
    }
}

// 切換語言並保持記錄
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('site_lang', currentLang);
    renderUI();
}

window.addEventListener('DOMContentLoaded', initSite);